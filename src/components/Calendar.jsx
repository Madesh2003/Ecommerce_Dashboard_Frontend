import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  useEffect(() => {
    console.log('Schedule Data:', scheduleData);
  }, [scheduleData]);
  

  const fetchScheduleData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/schedule');
      setScheduleData(response.data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  const handleActionBegin = async (args) => {
    try {
      console.log('Action: ' + args.requestType);
      
      if (args.requestType === 'eventCreate') {
        console.log('New event created:');
        console.log(args.addedRecords);
        
        await axios.post('http://localhost:8000/api/schedule', args.addedRecords[0]);
        await fetchScheduleData(); 
      } else if (args.requestType === 'eventChange') {
        console.log('Changed Records: ');
        console.log(args.changedRecords);
        console.log('Added Records: ');
        console.log(args.addedRecords);
        console.log('Deleted Records: ');
        console.log(args.deletedRecords);
  
        await axios.put(`http://localhost:8000/api/schedule/${args.changedRecords[0].id}`, args.changedRecords[0]);
        await fetchScheduleData();
      } else {
        console.log('Unsupported action:', args.requestType);
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
        actionBegin={handleActionBegin}
      >
        
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table style={{ width: '100%', background: 'white' }}>
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date()}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;