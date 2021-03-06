// 尽管 JavaScript 一般被划分到“动态”或者“解释型”语言的范畴，但是其实它是一个编译型语言。任何 JavaScript 代码段在它执行之前（通常是 刚好 在它执行之前！）都必须被编译。

// 在传统的编译型语言处理中，一块儿源代码，你的程序，在它被执行 之前 通常将会经历三个步骤，大致被称为“编译”：

// 分词/词法分析： 将一连串字符打断成（对于语言来说）有意义的片段，称为 token（记号）.
// 解析： 将一个 token 的流（数组）转换为一个嵌套元素的树，它综合地表示了程序的语法结构。这棵树称为“抽象语法树”（AST —— Abstract Syntax Tree）。
// 代码生成： 这个处理将抽象语法树转换为可执行的代码。这一部分将根据语言，它的目标平台等因素有很大的不同。

// 作用域
// 如果在直接作用域中找不到一个变量的话，引擎 就会咨询下一个外层作用域，如此继续直到找到这个变量或者到达最外层作用域（也就是全局作用域）。

// 作用域是一组规则，它决定了一个变量（标识符）在哪里和如何被查找。这种查询也许是为了向这个变量赋值，这时变量是一个 LHS（左手边）引用，或者是为取得它的值，这时变量是一个 RHS（右手边）引用。
// LHS 引用得自赋值操作。作用域 相关的赋值可以通过 = 操作符发生，也可以通过向函数参数传递（赋予）参数值发生。
// LHS 和 RHS 引用查询都从当前执行中的 作用域 开始，如果有需要（也就是，它们在这里没能找到它们要找的东西）它们会在嵌套的 作用域 中一路向上，一次一个作用域（层）地查找这个标识符，直到它们到达全局作用域（顶层）并停止，既可能找到也可能没找到。
// 未被满足的 RHS 引用会导致 ReferenceError 被抛出。未被满足的 LHS 引用会导致一个自动的，隐含地创建的同名全局变量（如果不是“Strict模式”[^note-strictmode]），或者一个 ReferenceError（如果是“Strict模式”[^note-strictmode]）。

// Example

function foo(a) {
    b = a;
    console.log(b);
}

foo(2);


// 以上代码 在调用foo()后将会有一个LHS: 'b = a'，但是b并没有被声明过，上层作用域找不到b，那么是这个LHS未被满足，未被满足的 LHS 引用会导致一个自动的，隐含地创建的同名全局变量
// 打印出2

// 当使用严格模式的时候会阻止这种行为并抛出ReferenceError：

function strictFoo(a) {
    "use strict";
    b = a;
    console.log(b)
}

strictFoo(2);



// Q：以下代码有几个LHS和RHS：
function foo(a) {
    var b = a;
    return a + b;
}

var c = foo( 2 );

// foo(2) RHS
// c LHS
// 隐含的赋值 a = 2 LHS
// b = a 的b LHS
// b = a 的a RHS
// a + b 共2个 RHS