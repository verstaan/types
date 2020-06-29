
export class WeeklyOverallStats {
    public totalWeekCount: number | undefined;
    public changeTotalWeek: string | undefined;
    public amountChangeTotalWeek: number | undefined;

    constructor(init?: Partial<WeeklyOverallStats>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.totalWeekCount != undefined &&
            this.changeTotalWeek != undefined &&
            this.amountChangeTotalWeek != undefined
        )
    }
}

export class MonthlyOverallStats {
    public totalMonthCount: number | undefined;
    public changeTotalMonth: string | undefined;
    public amountChangeTotalMonth: number | undefined;

    constructor(init?: Partial<MonthlyOverallStats>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.totalMonthCount != undefined &&
            this.changeTotalMonth != undefined &&
            this.amountChangeTotalMonth != undefined
        )
    }
}

export class StatsPerCategory {
    public name: string | undefined;
    public count: number | undefined;
    public change: string | undefined;
    public amountChange: number | undefined;

    constructor(init?: Partial<StatsPerCategory>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.name != undefined &&
            this.name != "" &&
            this.count != undefined &&
            this.change != undefined &&
            this.amountChange != undefined
        )
    }
}

export class ThirtyDayCount {
    public dateTime: string | undefined;
    public dayName: string | undefined;
    public count: number | undefined;

    constructor(init?: Partial<ThirtyDayCount>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.dateTime != undefined &&
            this.dayName != undefined &&
            this.count != undefined
        )
    }
}

export class Analytics {
    public weeklyOverallStats: WeeklyOverallStats | undefined;
    public monthlyOverallStats: MonthlyOverallStats | undefined;
    public weeklyStatsPerCategory: StatsPerCategory[] | undefined;
    public monthlyStatsPerCategory: StatsPerCategory[] | undefined;
    public thirtyDayCount: ThirtyDayCount[] | undefined;

    constructor(init?: Partial<Analytics>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.weeklyOverallStats != undefined &&
            this.weeklyStatsPerCategory != undefined &&
            this.monthlyOverallStats != undefined &&
            this.monthlyStatsPerCategory != undefined &&
            this.thirtyDayCount != undefined
        )
    }
}

