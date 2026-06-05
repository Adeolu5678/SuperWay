// Google Apps Script code for SuperWay Cleaning bookings
// Deploy as a Web App: Execute as "Me", Who has access: "Anyone"

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with your Google Sheet ID (from URL)
const CALENDAR_ID = "primary"; // Uses your primary calendar, or replace with a specific secondary calendar ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Log to Google Sheets
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    const bookingId = "SW-" + Date.now();
    const timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      bookingId,
      data.fullName || "",
      data.phoneNumber || "",
      data.emailAddress || "",
      data.serviceNeeded || "",
      data.propertyType || "",
      data.location || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.frequency || "",
      data.notes || "",
      "Confirmed"
    ]);
    
    // 2. Create Calendar Event
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    if (calendar) {
      // Parse date and time (assuming preferredDate is YYYY-MM-DD and preferredTime is HH:MM)
      const dateParts = data.preferredDate.split("-"); // [YYYY, MM, DD]
      const timeParts = data.preferredTime.split(":"); // [HH, MM]
      
      if (dateParts.length === 3 && timeParts.length === 2) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
        const day = parseInt(dateParts[2], 10);
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);
        
        const startTime = new Date(year, month, day, hour, minute);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration by default
        
        const title = "[SuperWay] " + data.serviceNeeded + " - " + data.fullName;
        const description = 
          "Name: " + data.fullName + "\n" +
          "Phone: " + data.phoneNumber + "\n" +
          "Email: " + data.emailAddress + "\n" +
          "Property: " + data.propertyType + "\n" +
          "Location: " + data.location + "\n" +
          "Frequency: " + data.frequency + "\n" +
          "Notes: " + data.notes;
          
        calendar.createEvent(title, startTime, endTime, {
          description: description,
          location: data.location
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      bookingId: bookingId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const dateParam = e.parameter.date; // Expecting YYYY-MM-DD
    if (!dateParam) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Missing date parameter"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const dateParts = dateParam.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    
    // Set start of day and end of day
    const startOfDay = new Date(year, month, day, 0, 0, 0);
    const endOfDay = new Date(year, month, day, 23, 59, 59);
    
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    const events = calendar.getEvents(startOfDay, endOfDay);
    
    const busy = events.map(function(event) {
      const start = event.getStartTime();
      const end = event.getEndTime();
      
      // Format as HH:MM
      const startHours = String(start.getHours()).padStart(2, '0');
      const startMinutes = String(start.getMinutes()).padStart(2, '0');
      const endHours = String(end.getHours()).padStart(2, '0');
      const endMinutes = String(end.getMinutes()).padStart(2, '0');
      
      return {
        start: startHours + ":" + startMinutes,
        end: endHours + ":" + endMinutes
      };
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      busy: busy
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
