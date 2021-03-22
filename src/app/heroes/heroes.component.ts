import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(HeroName: string, Department: string, DateOfJoining: string, PhotoFileName: string, Rank: string): void {

    this.nameCheck(HeroName);
    this.departmentCheck(Department);
    this.dateCheck(DateOfJoining);
    this.picCheck(PhotoFileName);
    this.rankCheck(Rank);

    if (this.nameError == undefined && this.departmentError == undefined && this.dateError == undefined && this.picError == undefined && this.rankError == undefined) {
      this.heroService.addHero({ HeroName, Department, DateOfJoining, PhotoFileName, Rank } as Hero)
        .subscribe(_ => {
          this.getHeroes();
        });
    }


  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // Form Validations 

  nameError: string;
  departmentError: string;
  dateError: string;
  picError: string;
  rankError: string;

  nameCheck(input: string) {
    this.nameError = this.noEmptyValidation(input);
  }

  departmentCheck(input: string) {
    this.departmentError = this.noEmptyValidation(input);
  }

  dateCheck(input: string) {
    this.dateError = this.dateValidation(input);
  }

  picCheck(input: string) {
    this.picError = this.noEmptyValidation(input);
  }

  rankCheck(input: string) {
    this.rankError = this.numberValidation(input);
  }

  noEmptyValidation(inputData: string) {
    var data = inputData.trim();
    if (!data) { return "Can\'t be empty." };
  }

  numberValidation(inputData: string) {
    var data = inputData.trim();
    if (!data) {
      return "Can\'t be empty.";
    } else if(data.search(/^\d*$/) == -1){
      return "Must be a number.";
    }
  }

  dateValidation(inputData: string) {
    var data = inputData.trim();
    if (!data) {
      return "Can\'t be empty.";
    } else {
      if (data.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) == -1) {
        return "Date format must be 'yyyy-mm-dd'";
      }
    }
  }





}
