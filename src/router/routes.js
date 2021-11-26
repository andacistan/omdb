import Search from "../view/Search";
import Detail from "../view/Detail";

export const routes= [
  {path:'', component:Search},
  {path:'/detail/:id', component:Detail},
]
