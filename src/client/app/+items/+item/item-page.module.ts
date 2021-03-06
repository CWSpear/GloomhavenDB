import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/types/entities/item';
import { ApiService } from '../../services/api/api.service';
import { ResolveService, RouteResolvers } from '../../services/resolver/resolve.service';
import { DiffModule } from '../../shared/diff/diff.module';
import { IconModule } from '../../shared/icon/icon.module';
import { ItemModule } from '../../shared/item/item.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';
import { WipBannerModule } from '../../shared/wip-banner/wip-banner.module';

import { ItemPageComponent, ItemResolveData } from './item-page.component';

const resolveRouteData: RouteResolvers<ItemResolveData> = {
  item: 'ItemResolver',
  suggestedFixes: 'SuggestedFixesResolver',
};

const routes: Routes = [
  {
    path: '',
    component: ItemPageComponent,
    resolve: resolveRouteData,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: resolveRouteData.suggestedFixes,
      useFactory: (resolveService: ResolveService) =>
        resolveService.suggestedFixesResolver<Item>(SuggestedFixType.Item, 'number'),
      deps: [ResolveService],
    },
    {
      provide: resolveRouteData.item,
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (route?: ActivatedRouteSnapshot): string => 'item-' + route.params['number'],
          getFreshData: (api: ApiService, route?: ActivatedRouteSnapshot): Promise<Item> =>
            api.findItem(route.params['number']),
        }),
      deps: [ResolveService],
    },
  ],
})
export class ItemPageRouterModule {}

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    ItemPageRouterModule,
    ItemModule,
    IconModule,
    PipesModule,
    FormsModule,
    TextWithIconsModule,
    DiffModule,
    FontAwesomeModule,
    WipBannerModule,
  ],
  declarations: [ItemPageComponent],
})
export class ItemPageModule {}
