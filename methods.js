function getInput(){
	return document.Calculator.display.value;
}
function clr(){
	document.Calculator.display.value = "";
}
function del(){
	var input = document.Calculator.display.value;
	document.Calculator.display.value = input.substring(0,input.length-1);
}
function brack(){
	var input = document.Calculator.display.value;
	if(input.includes('(') ){
		document.Calculator.bracket.value = ')';
		document.Calculator.display.value += ')';
	}else{
		document.Calculator.display.value += '(';
	}
}
function dec(c){
	document.Calculator.display.value += c;
}

function equal(){
	var n=getInput();
	numb = n.match(/\d/g);
	numb = numb.join("");
	digit = parseFloat(numb);
	//computing the functions seperately
	//working on the basic operators
	if(n.includes('+') || n.includes('-') || n.includes('*') || n.includes('/') || n.includes('%')){
		document.Calculator.display.value = evaluate();
	}
	//on the exponantial 
	else if(n.includes('e')){
		document.Calculator.display.value = Math.exp(digit);
	}
	//log
	else if(n.includes('log')){
		document.Calculator.display.value = Math.log10(digit);
	}
	//ln
	else if(n.includes('ln')){
		document.Calculator.display.value = Math.log(digit);
	}
	//square root
	else if(n.includes('√')){
		document.Calculator.display.value = Math.sqrt(digit);
	}
	//power
	else if(n.includes('^')){
		splitt = n.split('^');
		a = Number(splitt[0]);
		b = Number(splitt[1]);
		document.Calculator.display.value = Math.pow(a,b);
	}
	//basic trig functions
	else if(n.includes('(') || !n.includes('(')){
		//runing the trig functions
		if(n.includes('sin')){
			document.Calculator.display.value = Math.sin(digit *(Math.PI / 180));
		}else if(n.includes('cos')){
			document.Calculator.display.value = Math.cos(digit *(Math.PI / 180));
		}
		else if(n.includes('tan')){
			document.Calculator.display.value = Math.tan(digit);
		}
	}

}
function evaluate(){
	var Input=getInput();
	var Operators =['+','-','*','/','%'];
	var Prefix=[1,1,2,2,2];
	var Infix=new Array();
	var Postfix=new Array();
	var answer;
	Infix= arrayn(Input);//or use for loop to move to arr
	Postfix= InToPostFix(Infix,Operators,Prefix);
	
	answer=solvePost(Postfix);
	return answer;
}
//return the input to array		
function arrayn(str){
	var n= new Array(0);
	var sa='';
	var i=0;
	while(i<str.length){
		if(isOperand(str[i])){
			sa =str[i];
			var j=1;
			while(isOperand(str[i+j])){
				sa+=str[i+j];
				j=j+1;
			}
			n.push(sa);
			i=i+j;
		}
		else if(isOPerat(str[i])){
			n.push(str[i]);
			i=i+1;
		}
		else{
			i=i+1;
		}
	}
	return n;			
}
function isOPerat(op){
	switch(op){
		case '+':
		case '-':
		case '/':
		case '*':
		case '%': return true;
		default : return false;
	}

}
			
function InToPostFix(statement,op,prece){//prece[] ??????????????
	var PostE=new Array(0);
	var Trash='';//stores the precedence of popped element
	var stack= new Array(1);
	stack[0]='#';
	var stackPre=new Array(1);
	stackPre[0]=0;
	statement.push('#');
	var i;
	for(i=0;i<statement.length;i++){
		var j;
		j=isOperator(statement[i],op);
		if(Number.isInteger(Number(statement[i]))==true){
			PostE.push(statement[i]);
		}
		else if(Number.isInteger(j)==true){//statement[i]==op[j]){
			if(prece[j]<stackPre[stack.length-1]){//if current pre is less than the pre at the top of stack
				while(prece[j]<stackPre[stackPre.length-1]){
					PostE.push(stack.pop());
					Trash+=stackPre.pop();//pop the precedence
				}	
				stack.push(statement[i]);
				stackPre.push(prece[j]);
								
			}
			else if(prece[j]>=stackPre[stackPre.length-1]){
			stack.push(statement[i]);
			stackPre.push(prece[j]);
			}
		}
		if(statement[i]=='#'){
			var ia;
			ia=stack.length-1;
			while(ia>=1){
				PostE.push(stack[ia]);
				ia=ia-1;
			}
		}
	}
	return PostE;
}
function isOperator(key,ops){
	for(var i=0; i<ops.length;i++){
		if(key==ops[i]){
			return i;
		}	
	}return "no";
}
function solvePost(exp){
	var stack = new Array();
	var ia ;
	var ans;
	ia=0;
	while(ia < exp.length){
		if(Number.isInteger(Number(exp[ia]))){			
			stack.push(exp[ia]);
		}
		else{
			if(stack.length<2){
				alert("Error");//change here
					break;
			}
			var b=Number(stack.pop());
			var a=Number(stack.pop());
			var c=operate(a,exp[ia],b);
			stack.push(c);
		}
		ia++;	
	}
	ans=stack.pop();			
	return ans;
}
//
function isOperand(index){
	return (index>='0' && index<='9');
}
//
function operate(x,op,y){
	if(op=='+'){
		return x+y;
	}
	else if(op=='-'){
		return x-y;
	}
	else if(op=='*'){
		return x*y;
	}
	else if(op=='/'){
		return x/y;
	}
	else if(op=='%'){
		return x%y;
	}
	return alert("cant operate");
}
