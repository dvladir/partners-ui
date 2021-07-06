import {AfterViewInit, Component, OnDestroy, TrackByFunction, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {PaginationConfig, PaginationData, SortField, TableComponent} from '@dvladir/ng-ui-kit';
import {PartnerHeaderDto} from '../../../api/models/partner-header-dto';
import {SearchPartners} from '../../store/parnter.actions';
import {PartnerState} from '../../store/partner.state';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationService} from '../../../base/services/navigation.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements AfterViewInit, OnDestroy {

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _nav: NavigationService
  ) { }

  private _terminator$: Subject<unknown> = new Subject<unknown>();

  private _isFirstInvoke: boolean = true;

  readonly searchForm: FormGroup = this._fb.group({
    search: ['']
  });

  @ViewChild('table', {static: true})
  table?: TableComponent<PartnerHeaderDto>;

  @Select(PartnerState.partnerList) partnerList$?: Observable<PaginationData<PartnerHeaderDto>>;

  readonly trackByFn: TrackByFunction<PartnerHeaderDto> = (index, item) => item.id;

  readonly paginationConfig: PaginationConfig<PartnerHeaderDto> = {
    getData: (pageSize: number, currentPage: number, sort: SortField): Observable<PaginationData<PartnerHeaderDto>> => {
      if (!this._isFirstInvoke) {
        const query = this.searchForm.controls.search.value;
        this._store.dispatch(new SearchPartners(currentPage, pageSize, query));
      } else {
        this._isFirstInvoke = false;
      }
      return this.partnerList$!;
    }
  }

  editPartner(partner: PartnerHeaderDto): void {
    this._nav.editPartner(partner.id);
  }

  createPartner(): void {
    this._nav.createPartner();
  }

  ngAfterViewInit(): void {
    const query = this._store.selectSnapshot(PartnerState.searchQuery);
    this.searchForm.controls.search.setValue(query, {emitEvent: false});
    this.searchForm.controls.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._terminator$)
      )
      .subscribe(() => {
        this.table!.refresh();
      });
  }

  ngOnDestroy(): void {
    this._terminator$.complete();
  }
}
