import { Component, OnInit } from '@angular/core';

// Http
import { HttpClient } from '@angular/common/http';

// RxJs
import { Observable } from 'rxjs';

// Icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Node {
  id: number;
  title: string;
  childern?: Node[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tree-shape-structure';

  faPlusCircle = faPlusCircle;

  // For Storing API response
  nodes!: any;

  // For Storing Title
  nodeTitle!: string;
  nodeTitle2!: string;
  nodeTitle3!: string;

  // To Store the value, that send to HTML
  rootLeve1Nodes: any;
  rootLeve2Nodes: any;
  rootLeve3Nodes: any;

  // To Toggle
  level1Menu: boolean = false;
  level2Menu: boolean = false;
  level3Menu: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/nodes').subscribe((nodes) => {
      console.log('MY NIDE', nodes);

      this.nodes = nodes;
    });
  }

  ShowLevel1(title: string) {
    this.level1Menu = !this.level1Menu;
    // console.log(this.level1Menu);

    // console.log('TITLE RECEIVED', title);
    this.nodeTitle = title;

    if (this.nodeTitle === title) {
      this.nodes.map((level1nodes: any) => {
        // console.log('InsideIF', level1nodes.rootOneSubMenu);
        this.rootLeve1Nodes = level1nodes.rootOneSubMenu;
      });
    }

    this.nodeTitle = '';
  }

  showLevel2(title: string) {
    this.nodeTitle2 = title;
    console.log(this.nodeTitle2);

    console.log(this.rootLeve1Nodes);
    this.rootLeve1Nodes.map((individualRootLevel1Nodes: any) => {
      // console.log(individualRootLevel1Nodes);

      if (individualRootLevel1Nodes.title === this.nodeTitle2) {
        this.level2Menu = !this.level2Menu;
        console.log('CHECK', individualRootLevel1Nodes.rootTwoSubMenu);

        this.rootLeve2Nodes = individualRootLevel1Nodes.rootTwoSubMenu;

        console.log(this.rootLeve2Nodes);
      }
    });
  }

  showLevel3(title: string) {
    this.nodeTitle3 = title;
    console.log(this.nodeTitle3);

    console.log(this.rootLeve2Nodes);

    this.rootLeve2Nodes.map((individualRootLevel2Nodes: any) => {
      // console.log(individualRootLevel2Nodes);

      if (individualRootLevel2Nodes.title === this.nodeTitle3) {
        this.level3Menu = !this.level3Menu;
        console.log('CHECK', individualRootLevel2Nodes.rootThreeSubMenu);

        this.rootLeve3Nodes = individualRootLevel2Nodes.rootThreeSubMenu;
      }
    });
  }

  // FIXME: MAM STYLE
  // showLevel2(title: string) {
  //   this.level2Menu = !this.level2Menu;
  //   this.nodeTitle2 = title;

  //   console.log('SAVED', this.nodeTitle2);
  //   console.log('TITLE', title);

  //   for (let i = 0; i <= this.rootLeve1Nodes.length; i++) {
  //     if (this.rootLeve1Nodes[i]?.title === title) {
  //       console.log('VALUEEE!!!', this.rootLeve1Nodes[i].rootTwoSubMenu);
  //       this.rootLeve2Nodes = this.rootLeve1Nodes[i].rootTwoSubMenu;
  //     }
  //   }
  // }

  // showLevel2(title: string) {
  //   console.log('FIRST!!!', this.rootLeve1Nodes);
  //   this.level2Menu = !this.level2Menu;
  //   // console.log(this.level2Menu);

  //   this.nodeTitle2 = title;
  //   // console.log(this.nodeTitle2);

  //   if (this.nodeTitle2 === title) {
  //     // console.log('rootLeve1Nodes', this.rootLeve1Nodes);

  //     this.rootLeve1Nodes.map((level2nodes: any) => {
  //       // console.log('level2nodes', level2nodes);
  //       this.rootLeve2Nodes = [level2nodes];
  //       console.log('root2Array', this.rootLeve2Nodes);
  //     });
  //   }

  //   this.nodeTitle2 = '';
  // }

  openSubMenu(title: string) {
    // console.log('TITLE RECEIVED', title);
    // this.nodeTitle = title;
    // if (this.nodeTitle === title) {
    //   this.nodes.map((level1nodes: any) => {
    //     console.log('InsideIF', level1nodes.rootOneSubMenu);
    //     this.rootLeve1Nodes = level1nodes.rootOneSubMenu;
    //   });
    // }
    // this.nodeTitle = '';
  }

  addNode() {
    this.http
      .post('http://localhost:3000/nodes', { name: 'New Node' })
      .subscribe((node) => {
        this.nodes.push(node);
      });
  }

  addChild(node: Node) {
    this.http
      .post(`http://localhost:3000/nodes/${node.id}/children`, {
        name: 'New Child',
      })
      .subscribe((child) => {
        // node.children.push(child);
      });
  }
}
