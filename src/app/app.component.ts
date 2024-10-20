import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenAIService } from './services/open-ai.service';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemoNgZorroAntdModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gptfilesearch';

  response:any;
  isSpinning = false;

  threadId:any;
  assistent = "asst_lNn8eNDlAZkWrwdJyvuoiQp6";
  // prompt = "How many minutes each student's pre-defence will last for?";
  prompt = "";

  constructor(private openAIService: OpenAIService) {}

  getThreadData() {
    this.response= null;
    this.isSpinning = true;
    this.openAIService.createThread(this.prompt).subscribe(
      (response) => {
        console.log("createThread",response); 
        this.threadId = response.id;
        this.runThread();
      },
      (error) => {
        this.isSpinning = false;
        console.error('Error creating thread:', error);  // Handle any errors
      }
    );
  }

  // createThreadMessage() {
  //   this.openAIService.createThreadMessage(this.threadId, this.prompt).subscribe(
  //     (response) => {
  //       console.log(response);  // Handle the response here
  //     },
  //     (error) => {
  //       console.error('Error creating thread:', error);  // Handle any errors
  //     }
  //   );
  // }

  runThread() {
    this.openAIService.runThread(this.threadId, this.assistent).subscribe(
      (response) => {
        console.log(response);  // Handle the response here
        this.listThreadMessages();
      },
      (error) => {
        this.isSpinning = false;
        console.error('Error creating thread:', error);  // Handle any errors
      }
    );
  }

  listThreadMessages() {
    // this.openAIService.listThreadMessages('thread_XEBflCmmSTziDo7lHl55SDVD').subscribe(
    this.openAIService.listThreadMessages(this.threadId).subscribe(
      (response) => {
        console.log("listThreadMessages",response);  // Handle the response here
        console.log(response.data[0]);
        if(response.data[0].content?.length === 0 || response.data[0].content[0].text.value == this.prompt){
          setTimeout(() => {
            this.listThreadMessages();
          }, 5000); // 10 seconds = 10000 milliseconds
        }else{
          this.response =response.data[0].content[0].text.value;
          this.isSpinning = false;
        }
      },
      (error) => {
        console.error('Error creating thread:', error);  // Handle any errors
        this.isSpinning = true;
      }
    );
  }
}
