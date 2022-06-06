// prototype inheritance  fot employeer`s

function Employee(firstName, lastName, experience, baseSalary){
  this.firstName = firstName;
  this.lastName = lastName;
  this.experience = experience;
  this.baseSalary = baseSalary;
};


//creating structure for calculation salary 

Employee.prototype.getSalary = function() {
  let countedSalary  = this.baseSalary;
  if (this.experience >= 2 && this.experience < 5) {
    countedSalary  = countedSalary  + 200;}
  else if (this.experience >= 5) {
    countedSalary  = countedSalary  * 1.2 + 500;
  }
  return countedSalary ;
}

//output of values

Employee.prototype.giveSalary  = function() {
  return document.write("<p>" +this.firstName + " " + this.lastName + " отримує " + this.getSalary() + " шекелей "+ "</p>" )
}

//devOp

function Developer(firstName, lastName, experience, baseSalary){
  Employee.call(this, firstName, lastName, experience, baseSalary);
}

Developer.prototype = Object.create(Employee.prototype);

//designer

function Designer(firstName, lastName, experience, baseSalary, coef){
  Employee.call(this, firstName, lastName, experience, baseSalary);
  this.coef = coef;
};

Designer.prototype = Object.create(Employee.prototype);

Designer.prototype.getSalary = function() {
  let countedSalary  = Employee.prototype.getSalary.call(this);
  return countedSalary  * this.coef;
}

//manager 

function Manager(firstName, lastName, experience, baseSalary, team){
  Employee.call(this, firstName, lastName, experience, baseSalary);
  this.team = team;
};

Manager.prototype = Object.create(Employee.prototype);

//manger salary

Manager.prototype.getSalary = function() {
    let countedSalary  = Employee.prototype.getSalary.call(this);
    
    if (this.team.length >= 5 && this.team.length < 10) {
      countedSalary  = countedSalary  + 200;
    }
    else if (this.team.length >= 10) {
      countedSalary  = countedSalary  + 300;
    }

    let facSlaves = 0;
    for(key in this.team){
      if(this.team[key] instanceof Developer ){
        facSlaves++;
      }
    }
    if (facSlaves > (this.team.length / 2)) {
      countedSalary  = countedSalary  * 1.1;
    }
    return countedSalary ;
}


//Departmen

function Department() {
  this.managers = [];
}
// displaying the salary for all employeers

Department.prototype.giveSalary = function() {
  this.managers.forEach( function (manager){
      manager.giveSalary();
      manager.team.forEach(function (slaves)  {
          slaves.giveSalary();
      });
  });
}


 // main function for displaying of salary all of team

 function main() {
  const dev = new Developer("Olia", "Brown", 3, 600);
  const dev2 = new Developer("Olexei", "Dark", 4, 600);
  const dev3 = new Developer("Bob", "Main", 10, 600);
  const desig = new Designer("Glory", "Mashin", 1, 1000, 0.5);
  const desig2 = new Designer("Pixel", "Stres", 15, 1000, 1);
  const manager = new Manager("Big", "Boss", 20, 1300, [dev, dev2, dev3,desig,desig2]);
  
  const departmen = new Department();
  departmen.managers.push(manager);
  departmen.giveSalary();
}


main();