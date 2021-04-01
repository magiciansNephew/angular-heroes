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

    if (
      this.nameError == undefined &&
      this.departmentError == undefined &&
      this.dateError == undefined &&
      this.picError == undefined &&
      this.rankError == undefined
    ) {
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

  validation = new FormValidation.InputValidation();

  nameCheck(input: string) {

    try { 
      this.validation.noEmptyValidation(input);
    } catch (error) {
      this.nameError = error.message;
    }
  }

  departmentCheck(input: string) {
    this.validation.noEmptyValidation(input);
  }

  dateCheck(input: string) {
    this.dateError = this.validation.dateValidation(input);
  }

  picCheck(input: string) {
    this.validation.noEmptyValidation(input);
  }

  rankCheck(input: string) {
    this.rankError = this.validation.numberValidation(input);
  }
}
