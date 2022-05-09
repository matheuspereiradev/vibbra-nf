
export class DateFunctions {

    public static getCompetence(date: Date): String {
        const mounth = date.getMonth() + 1;
        const year = date.getFullYear();
        if (mounth < 10)
            return `0${mounth}/${year}`

        return `${mounth}/${year}`

    }
}