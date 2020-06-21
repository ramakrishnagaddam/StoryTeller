import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './category/create/create.component';
import { VolumeComponent } from './volume/volume.component';
import { StoriesComponent } from './stories/stories.component';
import { VolumeCreateComponent } from './volume/volume-create/volume-create.component';
import { StoryCreateComponent } from './stories/story-create/story-create.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { UpcomingCreateComponent } from './upcoming/upcoming-create/upcoming-create.component';

const routes: Routes = [
  { path: "", component: CategoryComponent },
  { path:"category", component: CreateComponent },
  { path: "upcoming", component: UpcomingComponent },
  { path: "upcoming/create", component: UpcomingCreateComponent },
  { path: ":categoryID", component: VolumeComponent },
  { path: ":categoryID/volume", component: VolumeCreateComponent },
  { path: ":categoryID/:volumeID", component: StoriesComponent },
  { path: ":categoryID/:volumeID/story", component: StoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
