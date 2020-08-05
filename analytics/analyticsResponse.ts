
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


/**
 * Sherlock V2 analytics summary
 */
export class GeneralStats {
    public count: number | undefined;
    public change: number | undefined;
    public day: string | undefined;
    public month: string | undefined;
    public date: string | undefined;

    constructor(init?: Partial<GeneralStats>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.count != undefined &&
            this.change != undefined &&
            this.day != undefined &&
            this.month != undefined &&
            this.date != undefined
        )
    }
}


export class PerCategoryStats {
    public category: string | undefined;
    public count: number | undefined;
    public change: number | undefined;
    public day: string | undefined;
    public month: string | undefined;
    public date: string | undefined;

    constructor(init?: Partial<GeneralStats>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.category != undefined &&
            this.count != undefined &&
            this.change != undefined &&
            this.day != undefined &&
            this.month != undefined &&
            this.date != undefined
        )
    }
}

export class AnalyticsSummary {
    public generalStats: GeneralStats[] | undefined;
    public perCategoryStats: PerCategoryStats[] | undefined;

    constructor(init?: Partial<AnalyticsSummary>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.generalStats != undefined &&
            this.perCategoryStats != undefined
        )
    }
}