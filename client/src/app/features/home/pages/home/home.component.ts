import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../../services/auth/auth.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeroComponent, IntroductionComponent],
})
export class HomeComponent {}
