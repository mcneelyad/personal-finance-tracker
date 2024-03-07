const BudgetCategories = {
    HOUSING: {
        RENT_MORTGAGE: 'Rent/Mortgage',
        PROPERTY_TAXES: 'Property Taxes',
        HOME_INSURANCE: 'Home Insurance',
        UTILITIES: {
            ELECTRICITY: 'Electricity',
            WATER: 'Water',
            GAS: 'Gas'
        },
    },
    TRANSPORTATION: {
        FUEL: 'Fuel',
        PUBLIC_TRANSPORTATION: 'Public Transportation',
        VEHICLE_MAINTENANCE: 'Vehicle Maintenance',
        PARKING_TOLLS: 'Parking/Tolls'
    },
    FOOD_DINING: {
        GROCERIES: 'Groceries',
        DINING_OUT: 'Dining Out',
        COFFEE_SNACKS: 'Coffee/Snacks'
    },
    HEALTH: {
        HEALTH_INSURANCE: 'Health Insurance',
        DOCTOR_VISITS: 'Doctor Visits',
        MEDICATIONS: 'Medications'
    },
    ENTERTAINMENT: {
        MOVIES_CONCERTS: 'Movies/Concerts',
        SUBSCRIPTIONS: 'Subscriptions',
        HOBBIES: 'Hobbies'
    },
    PERSONAL_CARE: {
        CLOTHING: 'Clothing',
        HAIRCUTS: 'Haircuts',
        COSMETICS_TOILETRIES: 'Cosmetics/Toiletries'
    },
    EDUCATION: {
        TUITION: 'Tuition',
        BOOKS_SUPPLIES: 'Books/Supplies',
        COURSES_WORKSHOPS: 'Courses/Workshops'
    },
    DEBT_PAYMENTS: {
        CREDIT_CARD: 'Credit Card Payments',
        LOAN: 'Loan Payments',
        PERSONAL_LOAN: 'Personal Loan Payments'
    },
    SAVINGS: {
        RETIREMENT: 'Retirement Contributions',
        EMERGENCY_FUND: 'Emergency Fund',
        OTHER_SAVINGS_GOALS: 'Other Savings Goals'
    },
    MISCELLANEOUS: {
        GIFTS_DONATIONS: 'Gifts/Donations',
        HOME_REPAIRS: 'Home Repairs',
        PET_EXPENSES: 'Pet Expenses',
        TRAVEL_VACATION: 'Travel/Vacation'
    }
}

module.exports = BudgetCategories;