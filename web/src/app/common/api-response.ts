import {Game} from "./game";
import {User} from "./user";

export interface ApiResponse {
  metadata: {
    _records: number,
  },
  data: Array<Game | User>,
  loginSuccess: boolean,
  registerSuccess: boolean,
}
