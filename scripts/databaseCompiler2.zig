//!==================================================================
//!     		         Main.json creator
//!==================================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file downloads and *compresses json from gh api
//! and stores it inside main.json.
//!
//! * : By compressed I mean removing uneeded feilds from the json
//!     and storing it inside ./database/main.json by doing:
//!
//! $ zig build run_databaseCompiler > ./database/main.json
//!==================================================================

// =======================
//         Imports
// =======================
const std = @import("std");
const helperFunctions = @import("helperFunctions");

// =======================
//        Constants
// =======================
const urls = [_][]const u8{
    // Increment these whenever more repositories have been added.
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=3&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=4&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=5&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=6&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=7&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:0&page=8&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:1&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:1&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:1&page=3&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:1&page=4&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:2&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:2&page=2&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:3&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:3&page=2&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:4&page=1&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:5&page=1&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:6..10&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:6..10&page=2&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:11..20&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:11..20&page=2&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:21..100&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:21..100&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:21..100&page=3&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:101..1000&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:101..1000&page=2&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:1001..5000&page=1&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:5001..50000&page=1&per_page=100",

    "https://api.github.com/search/repositories?q=topic:zig+fork:true+stars:%3E=50000&page=1&per_page=100",
};

// =======================
//          Main
// =======================
pub fn main() !void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

    var buffers_collection = std.ArrayList([]const u8).init(helperFunctions.globalAllocator);
    defer {
        for (buffers_collection.items) |item| {
            helperFunctions.globalAllocator.free(item);
        }
        buffers_collection.deinit();
    }
    for (urls) |url| {
        const res = try helperFunctions.fetch(helperFunctions.globalAllocator, url);
        if (!std.mem.eql(u8, res, "")) {
            try buffers_collection.append(res);
        } else {
            @panic("unable to reach url");
        }
    }
    const buffers = try buffers_collection.toOwnedSlice();
    defer helperFunctions.globalAllocator.free(buffers);
    for (buffers, 0..) |buffer, i| {
        // -------- Parse the json file --------
        const parsed = try std.json.parseFromSlice(std.json.Value, helperFunctions.globalAllocator, buffer, .{});
        defer parsed.deinit();

        // ----- Get all the items (Repos) as array -----
        const repoListUncompressed = parsed.value.object.get("items").?.array.items;

        // ----- If last result -----
        if (i == buffers.len - 1) {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, true);
        } else {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, false);
        }
    }

    // -------- End the json file ---------
    helperFunctions.print("]", .{});
}
