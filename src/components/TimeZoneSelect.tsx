import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { GoTriangleDown } from 'react-icons/go';

interface TimeZoneOption {
  value: string;
  label: string;
}

interface TimeZoneSelectProps {
  handleChangeTimeZone: (value: string) => void;
}

const timeZoneOptions: TimeZoneOption[] = [
  { value: 'Pacific/Midway', label: 'Pacific/Midway (GMT-1100)' },
  { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu (GMT-1000)' },
  { value: 'America/Anchorage', label: 'America/Anchorage (GMT-0900)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-0800)' },
  { value: 'America/Denver', label: 'America/Denver (GMT-0700)' },
  { value: 'America/Chicago', label: 'America/Chicago (GMT-0600)' },
  { value: 'America/New_York', label: 'America/New_York (GMT-0500)' },
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (GMT-0300)' },
  { value: 'Atlantic/Azores', label: 'Atlantic/Azores (GMT-0100)' },
  { value: 'Europe/London', label: 'Europe/London (GMT+0000)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (GMT+0100)' },
  { value: 'Europe/Athens', label: 'Europe/Athens (GMT+0200)' },
  { value: 'Africa/Cairo', label: 'Africa/Cairo (GMT+0200)' },
  { value: 'Europe/Moscow', label: 'Europe/Moscow (GMT+0300)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (GMT+0400)' },
  { value: 'Asia/Karachi', label: 'Asia/Karachi (GMT+0500)' },
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (GMT+0530)' },
  { value: 'Asia/Bangkok', label: 'Asia/Bangkok (GMT+0700)' },
  { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong (GMT+0800)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+0900)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (GMT+1000)' },
  { value: 'Pacific/Guadalcanal', label: 'Pacific/Guadalcanal (GMT+1100)' },
  { value: 'Pacific/Auckland', label: 'Pacific/Auckland (GMT+1300)' },
  { value: 'Pacific/Tongatapu', label: 'Pacific/Tongatapu (GMT+1300)' },
];


const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({ handleChangeTimeZone }) => {
  const [options, setOptions] = useState<TimeZoneOption[]>([]);

  useEffect(() => {
    setOptions(timeZoneOptions); 
  }, []);

  return (
    <Select
      onChange={handleChangeTimeZone}
      defaultValue="Asia/Tokyo"
      dropdownStyle={{ backgroundColor: '#212324', borderRadius: '10px', width: "300px", border: "1px #C7A76B solid", color: "white" }}
      popupClassName="custom-dropdown"
      suffixIcon={<GoTriangleDown className="text-[#9fa0a1] text-sm" />}
      options={options}
    />
  );
};

export default TimeZoneSelect;
