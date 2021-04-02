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
    this.nameCheck(HeroName);
    this.departmentCheck(Department);
    this.dateCheck(DateOfJoining);
    this.picCheck(PhotoFileName);
    this.rankCheck(Rank);

    if (this.validationDone) {
      this.heroService
        .addHero({
          HeroName,
          Department,
          DateOfJoining,
          PhotoFileName,
          Rank,
        } as Hero)
        .subscribe((_) => {
          this.getHeroes();
        });
    }
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // Form Validations

  nameError: string;
  departmentError: string;
  dateError: string;
  picError: string;
  rankError: string;

  validationDone = false;

  validation = new FormValidation.InputValidation();

  nameCheck(input: string) {
    try {
      this.validation.noEmptyValidation(input);
      this.validationDone = true;
      this.nameError = undefined;
    } catch (error) {
      this.nameError = error.message;
      this.validationDone = false;
    }
  }

  departmentCheck(input: string) {
    try {
      this.validation.noEmptyValidation(input);
      this.validationDone = true;
      this.departmentError = undefined;
    } catch (error) {
      this.departmentError = error.message;
      this.validationDone = false;
    }
  }

  dateCheck(input: string) {
    try {
      this.validation.dateValidation(input);
      this.validationDone = true;
      this.dateError = undefined;
    } catch (error) {
      this.dateError = error.message;
      this.validationDone = false;
    }
  }

  picCheck(input: string) {
    try {
      this.validation.noEmptyValidation(input);
      this.validationDone = true;
      this.picError = undefined;
    } catch (error) {
      this.picError = error.message;
      this.validationDone = false;
    }
  }

  rankCheck(input: string) {
    try {
      this.validation.numberValidation(input);
      this.validationDone = true;
      this.rankError = undefined;
    } catch (error) {
      this.rankError = error.message;
      this.validationDone = false;
    }
  }
}
