import { reactive } from 'vue';
import { seedData } from './seed.js';

export const store = {
    state: {
        data: reactive(seedData)
    },

    getActiveDay() {
        return this.state.data.find(day => day.active);
    },

    setActiveDay(dayId) {
        this.state.data.map(dayObj => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
        });
    },

    submitEvent(eventDetails) {
        const activeDay = this.getActiveDay();
        activeDay.events.push({"details": eventDetails, "edit": false});
    },

    editEvent(dayId, eventDetails) {
        this.resetEditOfAllEvents();
        const eventObj = this.getEventObj(dayId, eventDetails);
        eventObj.edit = true;
    },
    
    resetEditOfAllEvents() {
        this.state.data.forEach(dayObj => {
            dayObj.events.forEach(event => {
                event.edit = false;
            });
        });
    },
    
    updateEvent(dayId, originalEventDetails, newEventDetails) {
        const eventObj = this.getEventObj(dayId, originalEventDetails);
        eventObj.details = newEventDetails;
        eventObj.edit = false;
    },

    getEventObj(dayId, eventDetails) {
        const dayObj = this.state.data.find(day => day.id === dayId);
        return dayObj.events.find(event => event.details === eventDetails);
    },
    
    deleteEvent(dayId, eventIndex) {
        const dayObj = this.state.data.find(day => day.id === dayId);
        dayObj.events.splice(eventIndex, 1);
    }
}