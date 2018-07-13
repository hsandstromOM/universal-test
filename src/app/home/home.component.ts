import {Component, OnInit} from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  home: Entry<any>;
  blogPosts: Entry<any>[];

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    const homeId = '3ngPUMlWVWgcYCI6qAoo4g';
  this.contentfulService.getHomePage(homeId)
    .then((home) => {
      this.home = home;
      this.titleService.setTitle(home.fields.seoTitle);
      this.meta.updateTag({ id: 'siteDescription', name: 'description', content: home.fields.seoDescription });

      this.meta.updateTag({ id: 'metaName', name: 'metaName', content: home.fields.seoTitle });
      this.meta.updateTag({ id: 'metaDescription', name: 'metaDescription', content: home.fields.seoDescription });

      this.meta.updateTag({ name: 'og:title', content: home.fields.seoTitle });
      this.meta.updateTag({ name: 'og:description', content: home.fields.seoDescription });
      this.meta.updateTag({ name: 'og:site_name', content: home.fields.seoTitle });
    });

  this.contentfulService.getBlogPosts()
    .then((blogPosts) => {
      this.blogPosts = blogPosts;
      console.log(blogPosts);
    });
  }
}
