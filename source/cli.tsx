#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
// import meow from 'meow';
import App from './ui';

require('dotenv').config()

// const cli = meow(`
// 	Usage
// 	  $ nostr-indexer

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ nostr-indexer --name=Jane
// 	  Hello, Jane
// `, {
//   flags: {
//     name: {
//       type: 'string'
//     }
//   }
// });

const { clear } = render(<App />);
clear()
