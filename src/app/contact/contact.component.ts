import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  formSubmitted: boolean = false;
  formSubmissionError: boolean = false;

  constructor(private http: HttpClient,private cd: ChangeDetectorRef) {
    this.contactForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'date': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required),
      'message': new FormControl('', Validators.required)
    });
  }

  

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:4000/api/send', this.contactForm.value)
        .pipe(
          catchError((error: any) => {
            console.error('Error sending email:', error);
            throw error;
          })
        )
        .subscribe(() => {
          console.log('Email sent successfully');
          this.formSubmitted = true;
          this.contactForm.reset();
          this.cd.detectChanges();
        });
    }
  }
}  
  
  
  