// 在JavaScript编程中，一个最常见的错误是类型错误：一种类型的值被使用，但被期望的值类型却是另一种。
// TypeScript的目标就是成为JavaScript的静态（编译时）类型检查器。其将在JavaScript程序实际执行（运行时）前，静态地保证程序中的类型正确。

// TypeScript提供了JavaScript的所有特性，同时提供了位于其上的一个额外附加层：TypeScript的类型系统。
// 这意味着现有的JavaScript代码就是TypeScript代码，其上的TypeScript类型系统还能帮助标出JavaScript代码中未预期到的错误，从而减低bug风险。

// TypeScript发展至今已拥有了更多功能，其优点有：
// ①.①静态类型检查。
// ①.②更多的静态检查，如词法错误（拼写错误）、语法错误（语句结构错误）、语义错误（逻辑错误、类型检查）。
// ①.③增强编辑器和IDE功能，核心的类型检查器能够提供报错信息、代码补全、接口提示、跳转定义、代码重构等等的功能。
// ②同Babel的功能，降级JavaScript代码，使之有更强的兼容性。

// 使用npm install -g typescript下载安装typescript编译器tsc
// tsc --help
// tsc xxx.ts
// tsc xxx.ts --target es3(default) | es5 | es6=es2015 | es2016

// Type Declaration
let str: string = "hehe";
let str0 = "hehe";  // type: string，如未明确声明类型，TypeScript会通过类型推理（Type Inference）规则推断出一个类型
// let str1: string = new String("hehe");  // ×，是包装类型String而非string
let str2: string = String("hehe");  // √

let u: undefined = undefined;
let str3: string = u;  // undefined/null是所有类型的子类型，也就是说undefined/null类型变量可赋值给任何类型的变量
let v: void = undefined;  // void并非所有类型的子类型，其地位与string、number等一致，void类型没什么用

let anyThing: any = "Tom";
anyThing.length;  // 声明为Any的变量，对其的任何操作，返回的内容的类型都是Any
let something;  // 变量声明时如未指定类型，其会被视为Any类型

// Union Types
let myFavoriteNumber: string | number;
// myFavoriteNumber.length;  // ×，我们只能访问此联合类型的所有类型里共有的属性或方法
myFavoriteNumber = 7;

// Interfaces（Object Declaration）
// 在TypeScript中，我们使用接口（Interfaces）来定义对象的类型
interface Person {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
let jerry: {
    name: string;
    age: number;
} = {
    name: 'Jerry',
    age: 25
};

// 在对象中，定义的变量比接口少了一些p属性是不允许的，多一些属性也是不允许的。可见，对象变量的形状必须和接口的形状保持一致
interface LessPerson {  // 可选属性允许我们少一些属性
    name: string;
    age?: number;
}
interface MorePerson {  // 任意属性允许我们多一些属性
    name: string;
    age?: number;
    [propName: string]: any;  // 属性名为string的属性，属性值必为any
    // 一个接口中只能定义一个任意属性
}
// interface WrongPerson {  // ×，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
//     name: string;
//     age?: number;
//     [propName: string]: string;
// }

interface ReadonlyPerson {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let wxq: ReadonlyPerson = {
    id: 89757,  // 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
    name: 'Wxq',
    gender: 'male'
};
// wxq.id = 9527;  // ×，只读

// Array Declaration
let numList0: number[] = [1, 1, 2, 3, 5];
let numList1: Array<number> = [1, 1, 2, 3, 5];
interface NumberArray {
    [index: number]: number;  // 索引类型为number时，其对应（属性）值必为number
}
let numList2: NumberArray = [1, 1, 2, 3, 5];

// Function Declaration
function sum00(x: number, y: number): number {
    return x + y;
}

let sum10: (x: number, y: number) => number = function (x, y) {
    return x + y;
};
interface Sum {
    (x: number, y: number): number;
}
let sum11: Sum = function (x, y) {
    return x + y;
};

let sum20: (x: number, y: number) => number = (x, y) => x + y;
let sum21: Sum = (x, y) => x + y;

// 函数调用时，输入的实参多了或少了都是不允许的
function lessSum(x: number, y?: number): number {  // 可选形参允许我们少传入一些实参
    if (y) {
        return x + y;
    } else {
        return x;
    }
    // 可选形参必须在必需形参之后
    // 带默认值的形参将被视为可选形参
}
function moreSum(x: number, y?: number, ...rest: any[]): number {  // 剩余形参允许我们多传入一些实参
    if (y) {
        if (rest) {
            let r: any;
            for (r of rest) {
                console.log(r);
            }
        }
        return x + y;
    } else {
        return x;
    }
}

function sum(x: number, y: number): number;
function sum(x: string, y: string): string;
function sum(x: any, y: any): any {
    return x + y;
}

// Class Declaration
class Animal {
    // 实例属性
    name: string = 'jinbi';  // 相当于默认值
    // 存取器实例属性（getter & setter）
    get owner(): string {
        return 'Jack';
    }
    set owner(value: string) {
        console.log(`${this.name}'s owner: ${value}`);
    }
    // 静态属性
    static num: number = 42;

    // 构造函数
    constructor(name: string) {
        this.name = name;
    }

    // 实例方法
    sayHi(): string {
        return `My name is ${this.name}`;
    }
    // 静态方法
    static isAnimal(a: Object): boolean {
        return a instanceof Animal;
    }
}
class Cat extends Animal {
    constructor(name: string) {
        super(name);  // 调用父类的constructor(name)
        console.log(this.name);
    }
    sayHi(): string {
        return 'Meow, ' + super.sayHi();  // 调用父类的 sayHi()
    }
}

// TypeScript可以使用三种访问修饰符（Access Modifiers）：public、protected和private
class AnimalWithModifiers {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}
// 当构造函数修饰为private时，该类不允许被继承或者实例化；当构造函数修饰为protected时，该类只允许被继承

// TypeScript支持抽象类
abstract class AnimalAbstract {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
    public abstract sayHi(): void;
}
class CatConcrete extends AnimalAbstract {
    public sayHi(): void {
        console.log(`Meow, My name is ${this.name}`);
    }
}

// TypeScript支持实现接口
interface Alarm {
    alert(): void;
}
class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}

// TypeScript中接口能继承接口
interface LightableAlarm extends Alarm {  // 继承后拥有3个待实现方法
    lightOn(): void;
    lightOff(): void;
}

// TypeScript中接口甚至能继承类
// 实际上，当我们声明一个类Point时，除了会创建一个名为Point的类之外，同时也创建了一个名为Point的类型。接口继承的实际上该Point类型
// 类对应建立的类型不包含构造函数、静态属性和静态方法
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};

// Generics
// 泛型（Generics）是指定义 函数、接口或类 时不预先指定具体的类型，而在使用时再指定类型的一种特性
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}
class GenericNumber<T> {
    add: (x: T, y: T) => T;
}

// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // ×，使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
//     return arg;
// }
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {  // 泛型约束，只允许传入那些包含length属性的变量
    console.log(arg.length);  // √
    return arg;
}

// Type Aliases
type Name = string | 'name';
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
type TypePerson = {  
    name: string;
    age: number;
}
// Type Aliases vs Interfaces: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

// Type Assertion
// 类型断言（Type Assertion）用来手动指定一个值的类型
// 将一个联合类型断言为其中一个类型
function isString(x: number | string): boolean {
    if ((x as string).length) {  // 我们只能访问联合类型的所有类型里共有的属性或方法。使用类型断言则可断言为其中一个类型，从而欺骗TypeScript编译器以避免编译时报错
        return true;
    }
    else {
        return false;
    }
}

// 将一个父类断言为更加具体的子类
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}

// 将任何一个类型断言为any
(window as any).foo = 1;  // 直接window.foo = 1在TypeScript中将报错

// 将any断言为一个具体的类型
// 常用于对历史遗留代码的使用

// 不是任何一个类型都可以被断言为另一个类型的，类型断言有其自己的限制
// TypeScript是结构类型系统，类型之间的对比只会比较它们最终的结构，而不会在乎它们定义时的关系。如果A的类型结构可以是B的子类，那么就等价于A extends B
// 类型断言生效的条件是两种类型兼容。类型的兼容性判断：TODO
// 如果A兼容B，则A、B互相兼容，A可断言为B，B也可断言为A

// Type Assertion vs Type Declaration:
// http://ts.xcatliu.com/basics/type-assertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80-vs-%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E

