var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        this.apiUrl = "http://www.eudc-app.com/debate";
        this.tournamentPrefix = "/tournament";
        this.userPrefix = "/user";
        this.eventPrefix = "/event";
        this.loadTournamentsURL = "http://www.eudc-app.com/debate/tournament/get-all";
        console.log('Hello RestProvider Provider');
    }
    // Fetches all tournaments. 
    // Return: array of Tournaments wrapped in a Promise
    RestProvider.prototype.getAllTournaments = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + _this.tournamentPrefix + "/get-all").subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    // Fetches user by id.
    // Params: user id
    // Return: User wrapped in a Promise
    RestProvider.prototype.getUserById = function (id) {
        var _this = this;
        var body = {
            user_id: id
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + _this.userPrefix + "/get-by-id", JSON.stringify(body))
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    // Fetches users associated to a unique tabbyCat URL
    // Params: URL, tournament id
    // Return: array of Users (one or two) wrapped in a Promise
    RestProvider.prototype.getUsersByUrl = function (url, id) {
        var _this = this;
        var body = {
            link: url,
            tournament_id: id,
        };
        console.log(body);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + _this.userPrefix + "/get-by-link", JSON.stringify(body))
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                return reject(err);
            });
        });
        // mock: return [{"user":{"id":"3","name":"Milos Marjanovic","university_id":"1"},"role":"Debating"},{"user":{"id":"4","name":"Aleksandra Mihajlovic","university_id":"1"},"role":"Debating"}];
    };
    // Fetches three current/upcoming events
    // Params: tournament id, current time
    // Return: array of 3 Events wrapped in a Promise
    RestProvider.prototype.getHomepageEvents = function (id, time) {
        var _this = this;
        var body = {
            tournament_id: id,
            current_time: time
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + _this.eventPrefix + "/home", JSON.stringify(body))
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                return reject(err);
            });
        });
        // mock: return [{"event":{"id":"1","name":"Registration","date_start":"2018-07-27 17:00:00","date_end":"2018-07-27 20:00:00","tournament_id":"1","type":"1","venue_id":"1","room_id":null},"venue":{"id":"1","name":"Hostel","about":"Some details about hostel","location":"latitude and longitude"},"room":""},{"event":{"id":"2","name":"Dinner","date_start":"2018-07-27 19:00:00","date_end":"2018-07-27 20:00:00","tournament_id":"1","type":"5","venue_id":"1","room_id":null},"venue":{"id":"1","name":"Hostel","about":"Some details about hostel","location":"latitude and longitude"},"room":""},{"event":{"id":"3","name":"Socials","date_start":"2018-07-27 21:00:00","date_end":"2018-07-28 02:00:00","tournament_id":"1","type":"3","venue_id":"2","room_id":null},"venue":{"id":"2","name":"Monk's Bar","about":"Some information about the bar","location":"44.8032902,20.4721153"},"room":""}];
    };
    // Fetches the schedule of a tournament
    // Params: tournament id
    // Return: array of Events wrapped in a Promise
    RestProvider.prototype.getSchedule = function (id) {
        var _this = this;
        var body = {
            tournament_id: id
        };
        return new Promise(function (resolve) {
            _this.http.post(_this.apiUrl + _this.eventPrefix + "/schedule-observer", JSON.stringify(body))
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
        // mock: return [{"event":{"id":"1","name":"Registration","date_start":"2018-07-27 17:00:00","date_end":"2018-07-27 20:00:00","tournament_id":"1","type":"1","venue_id":"1","room_id":null},"venue":{"id":"1","name":"Hostel","about":"Some details about hostel","location":"latitude and longitude"},"room":""},{"event":{"id":"2","name":"Dinner","date_start":"2018-07-27 19:00:00","date_end":"2018-07-27 20:00:00","tournament_id":"1","type":"5","venue_id":"1","room_id":null},"venue":{"id":"1","name":"Hostel","about":"Some details about hostel","location":"latitude and longitude"},"room":""},{"event":{"id":"3","name":"Socials","date_start":"2018-07-27 21:00:00","date_end":"2018-07-28 02:00:00","tournament_id":"1","type":"3","venue_id":"2","room_id":null},"venue":{"id":"2","name":"Monk's Bar","about":"Some information about the bar","location":"44.8032902,20.4721153"},"room":""},{"event":{"id":"4","name":"Breakfast & Registration","date_start":"2018-07-28 08:00:00","date_end":"2018-07-28 09:00:00","tournament_id":"1","type":"1","venue_id":"3","room_id":"1"},"venue":{"id":"3","name":"Faculty of Organizational Sciences","about":"Some data about faculty","location":"44.7726008,20.4751682"},"room":{"id":"1","name":"B009","location":null,"description":null,"venue_id":"3"}},{"event":{"id":"5","name":"Briefings","date_start":"2018-07-28 09:00:00","date_end":"2018-07-28 09:30:00","tournament_id":"1","type":"7","venue_id":"3","room_id":"2"},"venue":{"id":"3","name":"Faculty of Organizational Sciences","about":"Some data about faculty","location":"44.7726008,20.4751682"},"room":{"id":"2","name":"B103","location":null,"description":null,"venue_id":"3"}},{"event":{"id":"6","name":"Round 1","date_start":"2018-07-28 09:30:00","date_end":"2018-07-28 11:30:00","tournament_id":"1","type":"2","venue_id":"3","room_id":"1"},"venue":{"id":"3","name":"Faculty of Organizational Sciences","about":"Some data about faculty","location":"44.7726008,20.4751682"},"room":{"id":"1","name":"B009","location":null,"description":null,"venue_id":"3"},"round":{"id":"1","motion":"TBA","infoslide":"N\/A","description":"Round 1 - Open round","event_id":"6"}}];
    };
    RestProvider.prototype.setDeviceId = function (userId, deviceId) {
        var _this = this;
        var body = {
            user_id: userId,
            device_id: deviceId,
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + _this.userPrefix + "/device-id", JSON.stringify(body))
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                return reject(err);
            });
        });
    };
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map