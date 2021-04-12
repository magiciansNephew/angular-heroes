import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import * as FormValidation from '../form-validation';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  // Form Validations
  fieldValidation = new FormValidation.FieldValidation();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{

    this.fieldValidation.nameCheck(this.hero.HeroName);
    this.fieldValidation.departmentCheck(this.hero.Department);
    this.fieldValidation.dateCheck(this.hero.DateOfJoining);
    this.fieldValidation.picCheck(this.hero.PhotoFileName);
    this.fieldValidation.rankCheck(this.hero.Rank.toString());

    if (this.fieldValidation.validationDone) {
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
    
  }

}
