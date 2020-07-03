import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ReleaseItemMetricsService } from '@core/services/release-item-metrics.service';
import { CodeCoverageModel } from '@core/models/code-coverage.interface';

@Component({
    selector: 'code-coverage-metrics',
    templateUrl: '../templates/views/home.component.html'

})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }    
}