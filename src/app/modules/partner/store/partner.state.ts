import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PaginationData, Sort, SortField} from '@vt/core';
import {PartnerHeaderDto} from '../../api/models/partner-header-dto';
import {PartnerService} from '../../api/services/partner.service';
import {InitialLoadPartners, SearchPartners} from './parnter.actions';
import {map} from 'rxjs/operators';
import {PageDataDto} from '../../api/models/page-data-dto';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface PartnerStateModel {
  partnerList: PaginationData<PartnerHeaderDto>;
  query: string;
}

const convertPageResponse = <T>(source: { data?: T[] } & PageDataDto): PaginationData<T> => {
  const elements: T[] = source.data || [] as T[];
  const sort: SortField = {sort: Sort.none, field: ''};
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

  private loadPartners(query: string, pageNum: number, pageSize: number): Observable<PaginationData<PartnerHeaderDto>> {
    return this._partnersApi.partnerControllerSearch({query, pageNum, pageSize}).pipe(
      map(r => convertPageResponse<PartnerHeaderDto>(r))
    );
  }

  @Action(InitialLoadPartners)
  async initialLoad(ctx: StateContext<PartnerStateModel>, action: InitialLoadPartners): Promise<unknown> {
    const state = ctx.getState();

    const query = state.query || '';
    const pageNum = state.partnerList?.currentPage || 0;
    const pageSize = state.partnerList?.pageSize || 10;

    const partnerList = await this.loadPartners(query, pageNum, pageSize).toPromise();

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
    const {pageNum, pageSize, query} = action;

    const partnerList = await this.loadPartners(query, pageNum, pageSize).toPromise();

    ctx.setState({
      ...state,
      query,
      partnerList
    });

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
}
