import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class appFunc {
    static obj_cycle(counter: number, obj_arr: any[], obj: string){
        obj = obj_arr[counter].val;
        if(counter == obj_arr.length - 1) counter = -1;
        counter++;

        return [counter, obj];
    }

    static sortArr(obj_arr: any[]) : any[]{
        obj_arr.sort((a, b) => a.order - b.order);
        return obj_arr;
    }

    static padTo2Digits(num: number){
        return num.toString().padStart(2, '0');
    }

    static convertMsToTime(milliseconds: number){
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        // hours = hours % 24;

        return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
    }
}