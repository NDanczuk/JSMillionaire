#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const neonTitle = chalkAnimation.neon("Who wants to be a Millionaire? \n")

    await sleep()
    neonTitle.stop()

    console.log(`${chalk.bgMagenta("HOW TO PLAY")} 
    I am a process on your computer. 
    If you get any question wrong I will be ${chalk.bgRed("KILLED!")}
    So get all the questions right!
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player"
        }
    })

    playerName = answers.player_name
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question1",
        type: "list",
        message: "What is the capital of Brazil?",
        choices: [
            "São Paulo",
            "Rio de Janeiro",
            "Brasilia",
            "Salvador"
        ]
    })

    return handleAnswer(answers.question1 == "Brasilia") 
}

async function question2() {
    const answers = await inquirer.prompt({
        name: "question2",
        type: "list",
        message: "Which is the largest state by land area in Brazil?",
        choices: [
            "São Paulo",
            "Amazonas",
            "Mato Grosso",
            "Bahia"
        ]
    })

    return handleAnswer(answers.question2 == "Amazonas") 
}


async function question3() {
    const answers = await inquirer.prompt({
        name: "question3",
        type: "list",
        message: "Who was the first president of Brazil?",
        choices: [
            "Getúlio Vargas",
            "Juscelino Kubitschek",
            "Marechal Deodoro da Fonseca",
            "Fernando Henrique Cardoso"
        ]
    })

    return handleAnswer(answers.question3 == "Marechal Deodoro da Fonseca") 
}

async function question4() {
    const answers = await inquirer.prompt({
        name: "question4",
        type: "list",
        message: 'What is the name of the famous Brazilian writer who wrote "Dom Casmurro" and "Memórias Póstumas de Brás Cubas"?',
        choices: [
            "Machado de Assis",
            "José de Alencar",
            "Graciliano Ramos",
            "Lima Barreto"
        ]
    })

    return handleAnswer(answers.question4 == "Machado de Assis") 
}

async function question5() {
    const answers = await inquirer.prompt({
        name: "question5",
        type: "list",
        message: 'Which Brazilian soccer player is commonly known as the "King of Soccer"?',
        choices: [
            "Romário",
            "Zico",
            "Pelé",
            "Ronaldo"
        ]
    })

    return handleAnswer(answers.question5 == "Pelé") 
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner ("Checking answer... ").start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `Well done ${playerName}!`})
    } else {
        spinner.error({text: "Game over, you loose! :("});
        process.exit(1)
    }
}

function winner() {
    console.clear()
    const msg = `Congrats, ${playerName}!   here is: \n $ 1 , 0 0 0 , 0 0 0`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await question5()
await winner()