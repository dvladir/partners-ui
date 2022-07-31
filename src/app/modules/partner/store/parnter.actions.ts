import {PartnerInfoDto} from '../../api/models/partner-info-dto';
import {SortField} from '@dvladir/ng-ui-kit';

export class SearchPartners {
  static readonly type = '[Partners] search';
  constructor(
    public pageNum: number = 0,
    public pageSize: number = 10,
    public query: string = '',
    public sort?: SortField
) {
  }
}

export class RefreshSearchPartners {
  static readonly type = '[Partners] refresh search';
}

export class InitialLoadPartners {
  static readonly type = '[Partners] initial load';
}

export class GetPartner {
  static readonly type = '[Partners] get partner';
  constructor(
    public partnerId?: string
  ) {
  }
}

export class ClearPartnerData {
  static readonly type = '[Partners] clear partner data';
}

export class SavePartner {
  static readonly type = '[Partners] save partner';
  constructor(
    public partner: PartnerInfoDto
  ) {
  }
}

export class DeletePartner {
  static readonly type = '[Partners] delete partner';
  constructor(
    public partnerId: string
  ) {
  }
}
