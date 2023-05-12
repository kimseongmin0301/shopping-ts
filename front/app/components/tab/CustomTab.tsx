'use client'

import React, { useEffect, useState } from 'react';
import { Tab, TabsHeader } from '@material-tailwind/react/components/Tabs';
import { Tabs } from '@material-tailwind/react';

interface CustomTabProps {
  value?: string | number;
  data?: {
    label: string;
    value: string | number;
  }[];

  onTrackable?: (value: string | number) => void;
}

export const CustomTab = (props: CustomTabProps) => {
  const { value = '', data = [], onTrackable = () => { } } = props;

  // 현재 활성화 된 탭 값
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value) setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (localValue) onTrackable(localValue);
  }, [localValue]);

  const onClickTab = (sValue: string | number) => () => {
    setLocalValue(sValue);
  };

  return (
    <Tabs value={localValue}>
      <TabsHeader>
        {data.map((item) => (
          <Tab key={item.value} value={item.value} onClick={onClickTab(item.value)}>
            {item.label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};
