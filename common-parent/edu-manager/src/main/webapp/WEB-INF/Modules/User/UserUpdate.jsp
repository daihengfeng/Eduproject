<!DOCTYPE html>
<html>
<head>
<title></title>
	<link rel="Stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/Styles/bridging.css"/>
	<script type="text/javascript" src="${pageContext.request.contextPath}/assets/Scripts/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/assets/Scripts/common.js"></script>
<script type="text/javascript">
function userUpdate(){
	/*$("#userForm").attr("action","");
	$("#userForm").submit();*/
}
$(document).ready(function(){

	 
});
</script>
</head>
<body>
	<form method="post" id="userForm" action="">
		<div class="specificPageEdit" style="*position: static;">
			<div class="form">
				<div class="specificPage_header fix">
					<h4 class="specificPage_title l">
						<span id="MainContent_lbTitle">修改</span>
					</h4>
					<span class="closePage r" onclick="Common.closePage();">关闭</span>
				</div>
				<div id="MainContent_divTitleTab" class="activeEdite_tab_list"
					style="margin-bottom: 3px;">
					<p>
						<span class="tab_list_current" data-tab="tab_1" onclick="Common.switchTab(this);">修改用户信息</span>
					</p>
				</div>

				<div class="hide_tab fix" data-tab="tab_1" id="tab_1">
					<div id="MainContent_UpdatePanel1">
						<table border="0" cellpadding="0" cellspacing="6" style="width: 100%">
							<tr>
								<td class="input_text tar">用户名：</td>
								<td>
									<p>
										<input name="userId" type="hidden" value=""/>
										<input name="username" type="text" value="" id="username"
										style="width: 150px;" readonly="readonly"/> 
									</p>
								</td>
								<td class="input_text tar">密码：</td>
								<td>
									<p>
										<input name="password" type="text" value="" id="password"  style="width: 150px;" readonly="readonly"/>
									</p>
								</td>
								<td class="input_text tar">手机号码：</td>
								<td>
									<p>
										<input name="tel" type="text" value="" id="tel" style="width: 150px;" />
									</p>
								</td>
							</tr>
							<tr>
								<td class="input_text tar">QQ：</td>
								<td>
									<p>
										<input name="qq" type="text" value="" id="qq" style="width: 150px;" />
									</p>
								</td>
								<td class="input_text tar">email：</td>
								<td>
									<p>
										<input name="iemail" type="text" value="" id="iemail" style="width: 150px;" />
									</p>
								</td>
								<td class="input_text tar">身份证：</td>
								<td>
									<p>
										<input name="idCard" type="text" value="" id="idCard"  style="width: 150px;" />
									</p>
								</td>
							</tr>
							<tr>
								<td class="input_text tar">支付方式：</td>
								<td>
									<p>
									  <select name="payType" id="payType" >
										<option value="">请选支付方式</option>
									</select>
									</p>
								</td>
								<td class="input_text tar">支付账号：</td>
								<td>
									<p>
										<input name="payAccount" type="text" value="" id="payAccount" style="width: 150px;" />
									</p>
								</td>
								<td class="input_text tar">姓名：</td>
								<td>
									<p>
										<input name="payAccountName" type="text" value="" id="payAccountName" style="width: 150px;" />
									</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				 <div class="form_btn form_btn_static">
                    <ul>
                        <li><input type="button" value="保存" onclick="userUpdate();"/></li>
                        <li><input type="button" value="关闭" onclick="Common.closePage();" /></li>
                    </ul>
                </div>
			</div>
		</div>
	</form>
</body>
</html>
