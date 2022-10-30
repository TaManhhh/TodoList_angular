import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  formGroup !: FormGroup;
  actionBtn :string="Lưu"

  constructor(private formBuilder :FormBuilder, private api:ApiService ,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData :any,) { }

  ngOnInit(): void {
    this.formGroup =this.formBuilder.group({
      tenDanhMuc : ['',Validators.required],
      maDanhMuc :['',Validators.required],
      ghiChu :['',Validators.required],
  });

  if(this.editData){
    this.actionBtn="Cập nhật";
    this.formGroup.controls['tenDanhMuc'].setValue(this.editData.tenDanhMuc);
    this.formGroup.controls['maDanhMuc'].setValue(this.editData.maDanhMuc);
    this.formGroup.controls['ghiChu'].setValue(this.editData.ghiChu);
  }

}

themMoi(){
  if(!this.editData){
    if(this.formGroup.valid){
      this.api.postProduct(this.formGroup.value)
      .subscribe({
        next:(res)=>{

          this.formGroup.reset();
          this.dialogRef.close('save');

        },error:()=>{
          alert("Không thể thêm danh mục")
        }
      })
    }
    }else{
      this.updateProduct()
  }
}


updateProduct(){

  this.api.putProduct(this.formGroup.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      this.formGroup.reset();
      this.dialogRef.close("update");
    },error:()=>{
      alert("Không thể cập nhật");
    }
  })
}


}
