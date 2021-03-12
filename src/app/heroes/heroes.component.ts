import { Component, OnInit } from '@angular/core';
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

  add(HeroName: string, Department: string, DateOfJoining: string, PhotoFileName: string, Rank: number): void {

    //TODO: Form Validation
    HeroName = HeroName.trim();
    if (!HeroName) { return; }

    this.heroService.addHero({HeroName, Department, DateOfJoining, PhotoFileName, Rank} as Hero)
      .subscribe(_ => {
        this.getHeroes();
      });

  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }


}
