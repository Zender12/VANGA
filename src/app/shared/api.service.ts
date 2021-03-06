import { Injectable } from '@angular/core';
import { CrudAPI } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { LoadingBarService } from './loading-bar.service';
import { Observable } from 'rxjs';
import {
  CURRENCY_PAIR_OPTIONS_LIST,
  FORECASTING_PERIOD_CONFIG,
  EXCHANGE_OPTIONS_LIST,
  SAMPLING_PERIOD_LIST,
  DIAGRAMM_DATA,
  FORECAST
} from './config';

@Injectable()
export class ApiService extends CrudAPI {

  constructor(
    public http: HttpClient,
    public loadingBarService: LoadingBarService,
  ) {
    super(http, loadingBarService);
  }

  getExchangeOptionsList(): Observable<any> {
    return this.read(EXCHANGE_OPTIONS_LIST).map(response => this.parsePyArayResponse(response));
    // return Observable.of([{id: 1, value: 'Poloniex'}]);
  }

  getCurrencyPairOptionsList(exchangeId: number): Observable<any> {
    return this.read(CURRENCY_PAIR_OPTIONS_LIST + '/?exchangeId=' + exchangeId).map(response => this.parsePyArayResponse(response));
    // return Observable.of([{id: 1, value: 'BTC USDT'}]);
  }

  getSamplingPeriodList(exchangeId: number, pairId: number): Observable<any> {
    return this.read(SAMPLING_PERIOD_LIST + '/?exchangeId=' + exchangeId + '&pairId=' + pairId).map(response => this.parsePyArayResponse(response));
    // return Observable.of([
    //   {id: 1, value: '5 min'},
    //   {id: 2, value: '15 min'},
    //   {id: 3, value: '30 min'},
    //   {id: 4, value: '2 hr'},
    //   {id: 5, value: '4 hr'},
    //   {id: 6, value: '1 day'},
    //   ]);
  }

  getForecastingPeriodConfig(exchangeId: number, pairId: number): Observable<any> {
    return this.read(FORECASTING_PERIOD_CONFIG + '/?exchangeId=' + exchangeId + '&pairId=' + pairId);
    // return Observable.of({
    //   minDate: '2018-03-07',
    //   maxDate: '2018-04-20'
    // });
  }

  getAppConfig(): Observable<any> {
     return Observable.of({
    });
  }

  getDigarammData(config: any): Observable<any> {
    console.log('getDigarammData', config);
    return this.read(DIAGRAMM_DATA + '/?config=' + JSON.stringify(config));
    // return Observable.of({
    //   data: [
    //     {
    //       'name': 'Germany',
    //       'series': [
    //         {
    //           'name': '2010',
    //           'value': 7300000
    //         },
    //         {
    //           'name': '2011',
    //           'value': 8940000
    //         }
    //       ]
    //     },
    //
    //   ],
    //   yLabel: 'Population',
    //   xLabel: 'Country'
    //   }
    // )
  }

  getForecast(config: any): Observable<any> {
    console.log('getForecast', config);
    return this.read(FORECAST + '/?config=' + JSON.stringify(config));
    // return Observable.of({
    //   data: [
    //     {
    //       'name': 'Germany',
    //       'series': [
    //         {
    //           'name': '2010',
    //           'value': 7300000
    //         },
    //         {
    //           'name': '2011',
    //           'value': 8940000
    //         }
    //       ]
    //     },
    //             {
    //       'name': 'France',
    //       'series': [
    //         {
    //           'name': '2010',
    //           'value': 5000002
    //         },
    //         {
    //           'name': '2011',
    //           'value': 5800000
    //         }
    //       ]
    //     }
    //
    //   ],
    //   yLabel: 'Population',
    //   xLabel: 'Country'
    //   }
    // )
  }

  private parsePyArayResponse(value) {
    return value.map(v => {
    return {id: v[0], value: v[1]};

  })
  }

}
