export interface PrincipalResponse {
  authorities: string[];
  details: {
    remoteAddress: string;
    sessionId: string;
  };
  principal: {
    password: string;
    username: string;
    authorities: string[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
  };
  credentials: string;
  name: string;
}
