import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComparadorComponent } from './components/comparador/comparador.component';
import { AboutComponent } from './components/about/about.component';
import { GraficaTemperaturaComponent } from './components/grafica-temperatura/grafica-temperatura.component';
import { GraficaHumedadComponent } from './components/grafica-humedad/grafica-humedad.component';
import { GraficaCalidadComponent } from './components/grafica-calidad/grafica-calidad.component';
import { GraficaLuminosidadComponent } from './components/grafica-luminosidad/grafica-luminosidad.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { LandingComponent } from './components/landing/landing.component';

const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'graficaLuminosidad/:id', component: GraficaLuminosidadComponent },
  { path: 'graficaTemperatura/:id', component: GraficaTemperaturaComponent },
  { path: 'graficaHumedad/:id', component: GraficaHumedadComponent },
  { path: 'graficaCalidad/:id', component: GraficaCalidadComponent },
  { path: 'comparador', component: ComparadorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: '**', component: LandingComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
