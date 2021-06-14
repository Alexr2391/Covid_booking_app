const config = [
    {
        store: {
            name: 'Spata',
            OPERATING_HOURS: {
                start: 9,
                end: 20
            },
            days_params: {
                sundays: [
                    true,
                    {
                        start: 11,
                        end: 19
                    }
                ],
                mondays: [
                    true,
                    {
                        start: 9,
                        end: 20
                    }
                ],
                tuesdays: [
                    true,
                    {
                        start: 9,
                        end: 20
                    }
                ],
                wednesdays: [
                    false,
                    {
                        start: 10,
                        end: 20
                    }
                ],
                thursdays: [
                    false,
                    {
                        start: 9,
                        end: 20
                    }
                ],
                fridays: [
                    false,
                    {
                        start: 13,
                        end: 18
                    }
                ],
                saturdays: [
                    false,
                    {
                        start: 9,
                        end: 17
                    }
                ]
            }
        }
    },
    {
        store: {
            name: 'Corinth',
            OPERATING_HOURS: {
                start: 9,
                end: 19
            },
            days_params: {
                sundays: [
                    true,
                    {
                        start: 11,
                        end: 19
                    }
                ],
                mondays: [
                    true,
                    {
                        start: 9,
                        end: 19
                    }
                ],
                tuesdays: [
                    true,
                    {
                        start: 9,
                        end: 19
                    }
                ],
                wednesdays: [
                    false,
                    {
                        start: 9,
                        end: 19
                    }
                ],
                thursdays: [
                    false,
                    {
                        start: 9,
                        end: 19
                    }
                ],
                fridays: [
                    false,
                    {
                        start: 13,
                        end: 18
                    }
                ],
                saturdays: [
                    false,
                    {
                        start: 9,
                        end: 17
                    }
                ]
            }
        }
    }
]

module.exports = {
    config: config
}