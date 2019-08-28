//
//jQuery.validator.addMethod("chrnum", function(value, element) {
//	var chrnum = /^([a-zA-Z0-9]+)$/;
//	return this.optional(element) || (chrnum.test(value));
//}, "只能输入数字和字母");

$(document).ready(function(){
	 $("#supplierForm").validate({
	        rules: {
	        	supplierName: {
	                required: true
	            },
	            supplierAliasName: {
	            	required: true
	            },
	            supplierCode:{
	            	required: true,
	            	number:true,
	            	maxlength: 6
	            }
	        },
	        messages: {
	        	supplierName: {
	                required: "<span class='red f12'>*请输入供应商名称</span>"
	            },
	            supplierAliasName: {
	            	required: "<span class='red f12'>*请输入供应商别名</span>"
	            },
	            supplierCode:{
	            	required: "<span class='red f12'>*请输入供应商名称</span>",
	            	number:"<span class='red f12'>*请输入数字</span>",
	            	maxlength:jQuery.format("<span class='red f12'>*长度不能大于6</span>")
	            }
	        }
	    });
});


