import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PaginationData, Sort, SortField} from '@dvladir/ng-ui-kit';
import {PartnerHeaderDto} from '../../api/models/partner-header-dto';
import {PartnerService} from '../../api/services/partner.service';
import {
  ClearPartnerData,
  DeletePartner,
  GetPartner,
  InitialLoadPartners,
  RefreshSearchPartners,
  SavePartner,
  SearchPartners
} from './parnter.actions';
import {catchError, map} from 'rxjs/operators';
import {PageDataDto} from '../../api/models/page-data-dto';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PartnerDto} from '../../api/models/partner-dto';
import {ErrorInfoDto} from '../../api/models/error-info-dto';
import {ValidationError} from '../../base/share/validation-error';

export interface PartnerStateModel {
  partnerList: PaginationData<PartnerHeaderDto>;
  query: string;
  editablePartner?: PartnerDto
  getPartnerSucceed?: boolean;
  savePartnerSucceed?: boolean;
  partnerValidationErrors?: ErrorInfoDto;
}

const convertPageResponse = <T>(source: { data?: T[] } & PageDataDto, sortData?: SortField): PaginationData<T> => {
  const elements: T[] = source.data || [] as T[];
  const sort: SortField = sortData || {sort: Sort.none, field: ''};
  const {
    pageNum: currentPage,
    pageSize,
    pagesCount: totalPages,
    total: totalElements
  } = source;
  return {elements, sort, currentPage, pageSize, totalPages, totalElements};
}

@State<PartnerStateModel>({
  name: 'partners',
  defaults: {
    query: '',
    partnerList: {
      pageSize: 0,
      currentPage: 0,
      sort: {
        sort: Sort.none,
        field: ''
      },
      elements: [],
      totalElements: 0,
      totalPages: 0
    }
  }
})
@Injectable()
export class PartnerState {

  constructor(
    private _partnersApi: PartnerService
  ) {
  }

  private loadPartners(query: string, pageNum: number, pageSize: number, sortData?: SortField): Observable<PaginationData<PartnerHeaderDto>> {

    let sort: string | undefined = '';
    if (sortData && sortData.sort !== Sort.none) {
      sort = `${sortData.field};${sortData.sort}`;
    }

    return this._partnersApi.partnerControllerSearch({query, pageNum, pageSize, sort}).pipe(
      map(r => convertPageResponse<PartnerHeaderDto>(r, sortData))
    );
  }

  @Action(InitialLoadPartners)
  async initialLoad(ctx: StateContext<PartnerStateModel>, action: InitialLoadPartners): Promise<unknown> {
    const state = ctx.getState();

    const query = state.query || '';
    const pageNum = state.partnerList?.currentPage || 0;
    const pageSize = state.partnerList?.pageSize || 10;
    const sort = state.partnerList?.sort;

    const partnerList = await this.loadPartners(query, pageNum, pageSize, sort).toPromise();

    ctx.setState({
      ...state,
      query,
      partnerList
    });

    return undefined;
  }

  @Action(SearchPartners)
  async searchPartners(ctx: StateContext<PartnerStateModel>, action: SearchPartners): Promise<unknown> {
    const state = ctx.getState();
    const {pageNum, pageSize, query, sort} = action;

    const partnerList = await this.loadPartners(query, pageNum, pageSize, sort).toPromise();

    ctx.setState({
      ...state,
      query,
      partnerList
    });

    return undefined;
  }

  @Action(RefreshSearchPartners)
  async refreshSearchPartners(ctx: StateContext<PartnerStateModel>, action: RefreshSearchPartners): Promise<unknown> {
    const state = ctx.getState();
    const query = state.query;
    const pageNum = state.partnerList.currentPage;
    const pageSize = state.partnerList.pageSize;
    const sort = state.partnerList.sort;
    return ctx.dispatch(new SearchPartners(pageNum, pageSize, query, sort));
  }

  @Action(GetPartner)
  async getPartner(ctx: StateContext<PartnerStateModel>, action: GetPartner): Promise<boolean> {
    const state = ctx.getState();
    const {partnerId} = action;
    let getPartnerSucceed = true;
    let editablePartner: PartnerDto | undefined = undefined;

    if (!partnerId) {
      ctx.setState({
        ...state,
        savePartnerSucceed: undefined,
        getPartnerSucceed,
        editablePartner
      });
      return true;
    }

    editablePartner = await this._partnersApi
      .partnerControllerGetPartner({partnerId})
      .pipe(
        catchError(err => {
          console.log(err);
          getPartnerSucceed = false;
          return of(undefined);
        })
      )
      .toPromise();

    ctx.setState({
      ...state,
      savePartnerSucceed: undefined,
      getPartnerSucceed,
      editablePartner
    });

    return true;
  }

  @Action(ClearPartnerData)
  async clearPartnerData(ctx: StateContext<PartnerStateModel>, action: ClearPartnerData): Promise<boolean> {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      savePartnerSucceed: undefined,
      getPartnerSucceed: undefined,
      editablePartner: undefined,
      partnerValidationErrors: undefined
    });
    return true;
  }

  @Action(SavePartner)
  async savePartner(ctx: StateContext<PartnerStateModel>, action: SavePartner): Promise<boolean> {
    const state = ctx.getState();
    const body = action.partner;
    const partnerId = body.id;

    let response$: Observable<unknown>;
    let savePartnerSucceed: boolean = true;
    let partnerValidationErrors: ErrorInfoDto | undefined = undefined;

    if (!partnerId) {
      response$ = this._partnersApi.partnerControllerAddPartner({body})
    } else {
      response$ = this._partnersApi.partnerControllerUpdatePartner({partnerId, body});
    }

    await response$.pipe(
      catchError(err => {
        console.log(err);
        savePartnerSucceed = false;
        if (err instanceof ValidationError) {
          partnerValidationErrors = err.errors;
        }
        return of(undefined)
      })
    ).toPromise();

    ctx.setState({
      ...state,
      savePartnerSucceed,
      partnerValidationErrors,
      getPartnerSucceed: undefined,
    });

    if (savePartnerSucceed) {
      await ctx.dispatch(new RefreshSearchPartners());
    }

    return true;
  }

  @Action(DeletePartner)
  async deletePartner(ctx: StateContext<PartnerStateModel>, action: DeletePartner): Promise<unknown> {
    const {partnerId} = action;
    let isDeleteSucceed: boolean = true;
    await this._partnersApi.partnerControllerRemovePartner({partnerId})
      .pipe(
        catchError(err => {
          isDeleteSucceed = false;
          console.log(err);
          return of(undefined);
        })
      )
      .toPromise();

    if (isDeleteSucceed) {
      ctx.dispatch(new RefreshSearchPartners());
    }
    return undefined;
  }

  @Selector()
  static searchQuery(state: PartnerStateModel): string {
    return state.query;
  }

  @Selector()
  static partnerList(state: PartnerStateModel): PaginationData<PartnerHeaderDto> {
    return state.partnerList;
  }

  @Selector()
  static editablePartner(state: PartnerStateModel): PartnerDto | undefined {
    return state.editablePartner;
  }

  @Selector()
  static partnerValidationErrors(state: PartnerStateModel): ErrorInfoDto | undefined {
    return state.partnerValidationErrors;
  }
}
