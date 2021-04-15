import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import * as FormValidation from '../form-validation';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // Form Validations
  fieldValidation = new FormValidation.FieldValidation();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(
    HeroName: string,
    Department: string,
    DateOfJoining: string,
    PhotoFileName: string,
    Rank: string
  ): void {
    var heroObj = {
      HeroName,
      Department,
      DateOfJoining,
      PhotoFileName,
      Rank,
    } as Hero;

    this.fieldValidation.bulkValidator(heroObj);
    this.heroService.addHero(heroObj).subscribe((_) => {
      this.getHeroes();
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
