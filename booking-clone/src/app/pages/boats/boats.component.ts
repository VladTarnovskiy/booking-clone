import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoatComponent } from '@components/boats/boat';

@Component({
  selector: 'app-boats',
  standalone: true,
  imports: [BoatComponent],
  templateUrl: './boats.component.html',
  styleUrl: './boats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoatsComponent {}