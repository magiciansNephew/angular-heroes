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
    try{

      this.validation.noEmptyValidation(input);
    }catch(error){
      this.departmentError = error.message;
    }
  }

  dateCheck(input: string) {
    try{

      this.validation.dateValidation(input);
    }catch(error){
      this.picError = error.message;
    }
  }

  picCheck(input: string) {
    try{

      this.validation.noEmptyValidation(input);
    }catch(error){
      this.dateError = error.message;
    }
  }

  rankCheck(input: string) {
    try{

      this.validation.numberValidation(input);
    }catch(error){
      this.rankError = error.message;
    }
  }
}
