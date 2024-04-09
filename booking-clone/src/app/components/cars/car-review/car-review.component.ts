import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RatingComponent } from '@components/shared/rating';
import { ICarReview } from '@shared/models/cars';

@Component({
  selector: 'app-car-review',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './car-review.component.html',
  styleUrl: './car-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarReviewComponent {
  @Input({ required: true }) review!: ICarReview;
}
