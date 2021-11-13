import * as tf from '@tensorflow/tfjs'
import React from "react"

const model_path = "./dqn/model.json"
export let model
export let currentValues
export let bestLocation
let cumulativeReward = 0

export class Brain extends React.Component {
    constructor(props) {
        super(props);
    }
    predict(input) {
        return this.model.predict(input);
    }
    getBestLocation(){
        return bestLocation
    }
    getState() {
        return {
            horizontalBingo: this.props.horizontalBingo.slice(),
            verticalBingo: this.props.verticalBingo.slice(),
            step: this.props.step,
            squares: this.props.squares.slice()
        }
    }
    async initialize(){
        this.model = await tf.loadLayersModel(model_path)
    }
    getStateTensor(state) {
        if (!Array.isArray(state)) {
            state = [state]
        }
        const numExamples = state.length

        const buffer = tf.buffer([numExamples,24,100, 1])
        for (let n = 0; n < numExamples; ++n) {
            if(state[n] == null)
                continue;
            state[n].squares.forEach((sq,i) => {
                buffer.set(this.squares[i],n,i,state[n].step,0)
            });
        }
        return buffer.toTensor()
    }
    giveReward(reward){
        cumulativeReward += reward
    }
    think(){
        if(currentValues != null)
            return
        tf.tidy(() => {
            const stateTensor = this.getStateTensor(this.getState())
            const predictOut = this.model.predict(stateTensor)
            currentValues = predictOut.dataSync()
            bestLocation = predictOut.argMax(-1).dataSync()[0]
        })
        return bestLocation
    }

    invalidateQValuesAndBestAction() {
        currentValues = null;
        bestLocation = null;
    }
}
