import { Component, OnInit } from '@angular/core';

// Http
import { HttpClient } from '@angular/common/http';

// RxJs
import { Observable } from 'rxjs';

// Icons
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tree-shape-structure';

  faPlusCircle = faPlusCircle;
  faPen = faPen;

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

  // TextField
  textFieldLevel1: boolean = false;
  textFieldLevel2: boolean = false;
  textFieldLevel3: boolean = false;

  // Text Field Value
  textFieldValue1!: string;

  // TODO:EDIT

  // EDIT TEXT FIELD
  editTextFieldValue1!: string;

  // TextField Toogle
  editTextFieldLeve1: boolean = false;
  editTextFieldLeve2: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/nodes').subscribe((nodes) => {
      console.log('MY NIDE', nodes);

      this.nodes = nodes;
    });
  }

  // TO DISPLAY THE DATA
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
      console.log(individualRootLevel1Nodes);

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

  // DISPAY TEXT FIELDS
  showTextField() {
    this.textFieldLevel1 = !this.textFieldLevel1;
  }

  showTextField2(title: string) {
    this.nodeTitle2 = title;
    this.textFieldLevel2 = !this.textFieldLevel2;
  }

  showTextField3(title: string) {
    this.nodeTitle3 = title; /* TODO: */
    this.textFieldLevel3 = !this.textFieldLevel3;
  }

  // SAVE BUTTON
  saveButton() {
    console.log('Button 1', this.textFieldValue1);
    console.log(this.rootLeve1Nodes);
    this.rootLeve1Nodes.push({ title: this.textFieldValue1 });

    this.textFieldLevel1 = false;
    this.textFieldValue1 = '';
  }

  saveButtonRoot2(title: string) {
    console.log('Button 2', this.textFieldValue1);

    this.rootLeve1Nodes.map((individualRootLevel1Nodes: any) => {
      if (individualRootLevel1Nodes.title === this.nodeTitle2) {
        console.log('CHECK', individualRootLevel1Nodes.rootTwoSubMenu);

        individualRootLevel1Nodes.rootTwoSubMenu.push({
          title: this.textFieldValue1,
        });

        this.textFieldLevel2 = false;
        this.textFieldValue1 = '';
      }
    });
  }

  saveButtonRoot3(title: string) {
    console.log('Button 2', this.textFieldValue1);

    this.rootLeve2Nodes.map((individualRootLevel2Nodes: any) => {
      if (individualRootLevel2Nodes.title === this.nodeTitle3) {
        individualRootLevel2Nodes.rootThreeSubMenu.push({
          title: this.textFieldValue1,
        });

        this.textFieldLevel3 = false;
        this.textFieldValue1 = '';
      }
    });
  }

  // CANCEL BUTTON
  cancelButton() {
    this.textFieldLevel1 = false;
  }

  cancelButtonRoot2() {
    this.textFieldLevel2 = false;
  }

  cancelButtonRoot3() {
    this.textFieldLevel3 = false;
  }

  // FIXME: EDIT

  // SHOW EDIT TEXT FIELD
  showEditTextField(title: string) {
    this.nodeTitle2 = title;
    this.editTextFieldLeve1 = !this.editTextFieldLeve1;
  }

  showEditTextField2(title: string) {
    this.nodeTitle3 = title;
    this.editTextFieldLeve2 = !this.editTextFieldLeve2;
  }

  // EDIT BUTTON
  EditButton() {
    console.log(this.editTextFieldValue1);

    this.rootLeve1Nodes.map((individualRootLevel1Node: any) => {
      // console.log(individualRootLevel1Node);

      if (individualRootLevel1Node.title === this.nodeTitle2) {
        console.log('CHECK', individualRootLevel1Node);

        individualRootLevel1Node.title = this.editTextFieldValue1;
      }
    });

    this.editTextFieldValue1 = '';
    this.editTextFieldLeve1 = false;
  }

  EditButtonRoot2() {
    console.log(this.editTextFieldValue1);

    // console.log(this.rootLeve1Nodes);

    this.rootLeve1Nodes.map((individualRootLevel1Nodes: any) => {
      if (individualRootLevel1Nodes.title === this.nodeTitle2) {
        // console.log('CHECK', individualRootLevel1Nodes.rootTwoSubMenu);

        individualRootLevel1Nodes.rootTwoSubMenu.map(
          (individualRootTwoSubMenu: any) => {
            console.log('CHECK', individualRootTwoSubMenu);

            if (individualRootTwoSubMenu.title === this.nodeTitle3) {
              individualRootTwoSubMenu.title = this.editTextFieldValue1;
              this.editTextFieldLeve2 = false;
              this.editTextFieldValue1 = '';
            }
          }
        );
      }
    });
  }

  // CANCEL Edit
  cancelEdit() {
    this.editTextFieldLeve1 = false;
  }

  cancelEditRoot2() {
    this.editTextFieldLeve2 = false;
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

  // addNode() {
  //   this.http
  //     .post('http://localhost:3000/nodes', { name: 'New Node' })
  //     .subscribe((node) => {
  //       this.nodes.push(node);
  //     });
  // }

  // addChild(node: Node) {
  //   this.http
  //     .post(`http://localhost:3000/nodes/${node.id}/children`, {
  //       name: 'New Child',
  //     })
  //     .subscribe((child) => {
  //       // node.children.push(child);
  //     });
  // }
}
