import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs';
import {log} from 'util';
import {PhoneCodesEnum} from '../../../enums/phone-codes.enum';
import {ChangeDetection} from '@angular/cli/lib/config/schema';

@Directive({
  selector: '[appPhoneMask]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneMaskDirective, multi: true}]
})
export class PhoneMaskDirective implements OnInit, OnChanges, OnDestroy, Validator {

  private _phoneControl: AbstractControl;
  private _preValue: string;
  private _phoneCode: string;

  @Input()
  set phoneControl(control: AbstractControl) {
    this._phoneControl = control;
  }

  @Input()
  set preValue(value: string) {
    this._preValue = value;
  }

  @Input()
  set phoneCode(value: string) {
    this._phoneCode = value;
  }

  private sub: Subscription;

  public carriageStart: number;
  public carriageEnd: number;
  public mask: string = '';
  public newValueValid: string = '';
  public validateInput: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private changeDetect: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.mask = PhoneCodesEnum[this._phoneCode];
    console.log('change');
    this.phoneValidate();
  }

  public ngOnDestroy(): void {
    this.validateInput = false;
    this.sub.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.mask !== PhoneCodesEnum[this._phoneCode] && this._phoneCode) {
      this.mask = PhoneCodesEnum[this._phoneCode];
      this._phoneControl.setValue(this._preValue);
      this.changeDetect.detectChanges();
    }
  }

  public phoneValidate(): void {
    this.sub = this._phoneControl.valueChanges.subscribe((data) => {
        if (data) {
          let preInputValue: string = this._preValue;

          let newVal: string = data.replace(/\D/g, '');
          this.carriageStart = this.renderer.selectRootElement('#tel').selectionStart;
          this.carriageEnd = this.renderer.selectRootElement('#tel').selectionEnd;

          if (data.length < preInputValue.length) {
            this.maskSubstitution(newVal);
            this._phoneControl.setValue(this.newValueValid, {emitEvent: false});
            this.renderer.selectRootElement('#tel').setSelectionRange(this.carriageStart, this.carriageEnd);
          } else {
            this.maskSubstitution(newVal);
            const removedD: string = data.charAt(this.carriageStart);

            if (preInputValue.length >= this.carriageStart) {
              if (removedD === '(' || removedD === '-') {
                this.carriageStart = this.carriageStart + 1;
                this.carriageEnd = this.carriageEnd + 1;
              }
              if (removedD === ')') {
                this.carriageStart = this.carriageStart + 2;
                this.carriageEnd = this.carriageEnd + 2;
              }
              this._phoneControl.setValue(this.newValueValid, {emitEvent: false});
              this.renderer.selectRootElement('#tel').setSelectionRange(this.carriageStart, this.carriageEnd);
            } else {
              this._phoneControl.setValue(this.newValueValid, {emitEvent: false});
              this.renderer.selectRootElement('#tel').setSelectionRange(this.carriageStart + 2, this.carriageEnd + 2);
            }
          }
        }
      });
  }

  public maskSubstitution(newVal: string): void {
    const newValArr: Array<string> = newVal.split('');
    const maskArr: Array<string> = this.mask.split('');

    // tslint:disable-next-line:typedef
    let index = 0;
    newVal = maskArr.map((item, idx) => {
      if (newValArr.length < index) {
        return '';
      }
      if (item !== '#') {
        return item;
      }
      index++;
      return newValArr[index - 1];
    }).join('');
    this.newValueValid = newVal;

  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return control.value.length !== this.mask.length ? {noValidMask: {maskValid: true, mask: this.mask}} : null;
  }
}
