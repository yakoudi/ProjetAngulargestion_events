import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import {
  Chart,
  ChartType,
  ChartData,
  ChartOptions,
  registerables
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EvenementService } from 'src/app/services/evenement.service';
import { EvolutionTopCategorieComponent } from "../evolution-top-categorie/evolution-top-categorie.component";
import { StatFournisseurComponent } from "../stat-fournisseur/stat-fournisseur.component";
import { PluscherEventComponent } from "../pluscher-event/pluscher-event.component";
import { TauxParticipationComponent } from "../taux-participation/taux-participation.component";



Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-stats-evenements',
  standalone: true,
  imports: [NgChartsModule, EvolutionTopCategorieComponent, StatFournisseurComponent, PluscherEventComponent, TauxParticipationComponent],
  templateUrl: './stats-evenements.component.html',
  styleUrls: ['./stats-evenements.component.scss']
})
export class StatsEvenementsComponent implements OnInit {

  // 📈 Évolution par mois et par catégorie
  evolutionChartData!: ChartData<'bar'>;
  evolutionChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: '📊 Évolution mensuelle des événements par catégorie' }
    }
  };

  // 📊 Nombre d’événements par RH
  chartData!: ChartData<'bar'>;
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: '📈 Événements créés par le RH' }
    }
  };

  // 🥧 Répartition par catégorie (en %)
  pieChartType: ChartType = 'pie';
  chartjsPlugins = [ChartDataLabels];
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#333', font: { size: 14 } }
      },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold', size: 14 },
        formatter: (value: number, context) => {
          const rawData = context.chart.data.datasets[0].data;
          const data = rawData.filter((v): v is number => typeof v === 'number');
          const total = data.reduce((acc, val) => acc + val, 0);
          if (total === 0) return '0%';
          const percentage = (value / total * 100).toFixed(1);
          return `${percentage}%`;
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const rawData = context.chart.data.datasets[0].data;
            const data = rawData.filter((v): v is number => typeof v === 'number');
            const total = data.reduce((acc, val) => acc + val, 0);
            const percentage = total ? (value / total * 100).toFixed(1) : '0';
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.loadBarChartSimple();
    this.loadPieChart();
  }

  private loadBarChartSimple() {
    this.evenementService.getStatsFinalisesParRh().subscribe(data => {
      this.chartData = {
        labels: Object.keys(data),
        datasets: [{
          label: 'Nombre d\'événements',
          data: Object.values(data),
          backgroundColor: '#36A2EB'
        }]
      };
    });
  }

  private loadPieChart() {
    this.evenementService.getStatsPourcentageCategorie().subscribe(data => {
      this.pieChartData.labels = data.map(item => item.categorie);
      this.pieChartData.datasets[0].data = data.map(item => item.percentage);
    });
  }



  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
  }
}
