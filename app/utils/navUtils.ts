import {NavController} from 'ionic-angular';

export function getRootNav(nav: NavController): NavController {
  let root = nav;
  while(root.parent != null){
    root = root.parent;
  }
  return root;
}