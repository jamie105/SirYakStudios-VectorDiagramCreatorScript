const inquirer = require('inquirer');
const fs = require('fs');

var colors = require('colors/safe');
var ui = new inquirer.ui.BottomBar();
console.clear();
ui.updateBottomBar(colors.bold(colors.green('SirYakStudios - VDCS, 2022\n\n')))

function Settings(){
	inquirer.prompt([
		{
			type: 'list',
			name: 'Options',
			message: 'Select a setting to modify from the below list',
			choices: ['Number Of Vectors(0000)','Exit']
		}
	]).then(answers => {
		if(answers.Options == "Exit"){
			console.clear()
			ui.updateBottomBar(colors.bold(colors.green('SirYakStudios - VDCS, 2022\n\n')));
            console.log(colors.brightRed("\nBYE!\n"))
			process.exit();
        }else{
			//console.clear()
			ui.updateBottomBar(colors.bold(colors.green('SirYakStudios - VDCS, 2022\n\n')));
            SettingsModify(answers.Options);
        }
	});
}

function SettingsModify(settings){
	if(settings === "Number Of Vectors"){
		inquirer.prompt([
			{
				type: 'input',
				name: 'input',
				message: "Modify NUMBER OF VECTORS, currently : 0000\n  > " 
			}
		]).then(answers => {
			console.log('modify')
			console.clear()
			ui.updateBottomBar(colors.bold(colors.green('SirYakStudios - VDCS, 2022\n\n')));
			Settings();
		})
	}
}

if (require.main === module) {
  Settings();
}
