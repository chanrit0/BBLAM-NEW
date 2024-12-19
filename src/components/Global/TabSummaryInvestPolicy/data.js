import {numberWithCommas} from 'utils';

export const months = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤษจิกายน',
  'ธันวาคม',
];

export const saving = [
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
];

export const contribution = [
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
  '15000',
];

const sumSaving = saving.reduce((acc, cur) => acc + Number(cur), 0);
const sumContribution = contribution.reduce((acc, cur) => acc + Number(cur), 0);
const total = sumSaving + sumContribution;

const sumTable = [
  ['รวม', numberWithCommas(sumSaving), numberWithCommas(sumContribution)],
  ['', 'รวมทั้งหมด', numberWithCommas(total)],
];

export const data = months.map((item, index) => {
  return [
    months[index],
    numberWithCommas(saving[index]),
    numberWithCommas(contribution[index]),
  ];
});

export const footer = sumTable;
